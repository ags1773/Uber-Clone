import React, {Component, Fragment} from 'react'
import UserHome from './userHome/userHome'
import FindRide from './findRide/findRide'
import WaitingForDriver from './waitingForDriver/waitingForDriver'
import Map from '../map/map'
import FinishRide from './finishRide/finishRide'
import {findDistance} from '../../helperFunctions'

async function setStatusAsFindRide (origin, destination) {
  let distance = await findDistance(origin, destination)
  let price = calculatePrice(distance)
  this.setState({
    status: 'findRide',
    price,
    origin: origin,
    destination: destination
  })
}

function calculatePrice (distance) {
  return 40 + (distance > 4 ? (distance - 4) * 15 : 0)
}
class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'renderHome',
      user: {},
      price: 0
    }
    this.props.socket.on('driverLocation', driverPos => {
      this.setState({
        status: 'waitingForDriver',
        destination: {lat: driverPos.lat, lng: driverPos.lng}
      })
    })
    this.props.socket.on('rideInfo', pos => {
      this.setState({
        status: 'trackRide',
        origin: pos.origin,
        destination: pos.destination
      })
    })
  }

  // ---- Lifecycle Hooks ----
  componentWillMount () {
    fetch('/api/user/userDetails')
      .then(res => {
        return res.json()
      })
      .then(user => {
        this.setState({user: user})
        this.props.socket.emit('userType', 'user', user._id)
        this.props.onLogin(user)
      })
      .catch(err => {
        console.log('ERROR ', err)
      })

    this.props.socket.on('driversNotAvailable', () => console.log('driversNotAvailable'))
  }

  render () {
    let component
    switch (this.state.status) {
      case 'renderHome':
        component = <UserHome
          socket={this.props.socket}
          setStatusAsFindRide={setStatusAsFindRide.bind(this)}
          user={this.state.user} />
        break
      case 'findRide':
        component = <FindRide />
        break
      case 'noDrivers':
        component = <Fragment>
          <div class='notification is-danger'>
            <button class='delete' onClick={() => this.setState({ status: 'renderHome' })} />
            No drivers found! Please try again!!
          </div>
          <UserHome
            socket={this.props.socket}
            setStatusAsFindRide={setStatusAsFindRide.bind(this)}
            user={this.state.user} />
        </Fragment>
        break
      case 'waitingForDriver':
        component = <WaitingForDriver
          origin={{lat: this.state.origin.lat, lng: this.state.origin.lng}}
          destination={{lat: this.state.destination.lat, lng: this.state.destination.lng}} />
        break
      case 'trackRide':
        component = <Map
          origin={this.state.origin}
          destination={this.state.destination} />
        break
      case 'finishRide':
        component = <FinishRide price={this.state.price} />
        break
    }
    return component
  }
}

export default User
