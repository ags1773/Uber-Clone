import React, {Component, Fragment} from 'react'
import './userHome.css'
import InputBoxes from '../../inputBoxes/inputBoxes'
import Map from '../../map/map'

let watchId
let socket
let options = {
  enableHighAccuracy: true
}
let geoError = () => {
  console.log('No position available')
}

class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      origin: {},
      destination: {},
      userPos: {lat: 12.9716, lng: 77.5946},
      drivers: []
    }
    socket = this.props.socket
  }
  // ---- Functions ----
  geoSuccess (position) {
    this.setState({userPos: {lat: position.coords.latitude, lng: position.coords.longitude}})
  }
  updateOriginDestination (obj) {
    this.setState({
      origin: obj.origin,
      destination: obj.destination
    })
  }

  // ---- Lifecycle Hooks ----
  componentWillMount () {
    watchId = navigator.geolocation.getCurrentPosition(this.geoSuccess.bind(this), geoError, options)
    // watchId = navigator.geolocation.watchPosition(this.geoSuccess.bind(this), geoError, options)
  }
  componentWillUnmount () {
    navigator.geolocation.clearWatch(watchId)
  }
  componentDidMount () {
    let data = {
      'userLoc': [this.state.userPos.lng, this.state.userPos.lat]
    }
    let myInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/api/user/findDrivers', myInit) // just shows all cabs near user..has no other use
      .then(result => {
        return result.json()
      })
      .then(drivers => {
        this.setState({drivers: drivers})
      })
      .catch(err => {
        console.log(err.json())
      })
  }

  findRide () {
    if (this.state.userPos.lat && this.state.userPos.lng && this.state.origin && this.state.destination) {
      const payload = {
        origin: this.state.origin,
        destination: this.state.destination,
        userPosition: this.state.userPos
      }
      socket.emit('findRide', payload, this.props.userId)
      this.props.setStatusAsFindRide()
    } else {
      console.log(`Can't find ride right now`)
    }
  }

  render () {
    return (
      <Fragment>
        <div class='level'>
          <InputBoxes
            updateOriginDestination={this.updateOriginDestination.bind(this)}
          />
          <button class='level-item button is-outlined' onClick={this.findRide.bind(this)}>Find Ride</button>
        </div>
        <Map
          origin={this.state.origin}
          destination={this.state.destination}
          userPos={this.state.userPos}
          drivers={this.state.drivers} />
      </Fragment>
    )
  }
}

export default User
