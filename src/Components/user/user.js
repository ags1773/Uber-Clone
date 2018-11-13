import React, {Component, Fragment} from 'react'
import UserHome from './userHome/userHome'
import FindRide from './findRide/findRide'
import WaitingForDriver from './waitingForDriver/waitingForDriver'
import Map from '../map/map'

function setStatusAsFindRide () {
  this.setState({
    status: 'findRide'
  })
}
class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'renderHome'
    }
  }

  // ---- Lifecycle Hooks ----
  componentWillMount () {
    fetch('/api/user/userDetails')
      .then(res => {
        return res.json()
      })
      .then(user => {
        this.setState({user: user})
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
        component = <UserHome socket={this.props.socket} setStatusAsFindRide={setStatusAsFindRide.bind(this)} />
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
          <UserHome socket={this.props.socket} />
        </Fragment>
        break
      case 'waitingForDriver':
        component = <WaitingForDriver
          origin={{lat: 12.9615, lng: 77.6442}}
          destination={{lat: 12.9793, lng: 77.6406}} />
        break
      case 'trackRide':
        component = <Map
          origin={{lat: 12.9615, lng: 77.6442}}
          destination={{lat: 12.9793, lng: 77.6406}}
          userPos={{lat: 12.9615, lng: 77.6442}} />
        break
    }
    return component
  }
}

export default User
