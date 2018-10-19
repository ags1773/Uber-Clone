import React, {Component, Fragment} from 'react'
import InputBoxes from '../inputBoxes'
import Map from '../map/map'

let watchId
let options = {
  enableHighAccuracy: true
}
let geoError = () => {
  console.log('No position available')
}
class User extends Component {
  constructor () {
    super()
    this.state = {
      origin: {
        latLng: {},
        address: ''
      },
      destination: {
        latLng: {},
        address: ''
      },
      userPos: {lat: 12.9716, lng: 77.5946},
      drivers: []
    }
  }
  // ---- Functions ----
  geoSuccess (position) {
    this.setState({userPos: {lat: position.coords.latitude, lng: position.coords.longitude}})
  }
  updateOrigin (obj) {
    this.setState({origin: obj})
  }
  updateDestination (obj) {
    this.setState({destination: obj})
  }

  // ---- Lifecycle Hooks ----
  componentWillMount () {
    watchId = navigator.geolocation.watchPosition(this.geoSuccess.bind(this), geoError, options)
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
    fetch('/api/driver/find', myInit)
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
    let data = {
      origin: this.state.origin.address,
      destination: this.state.destination.address,
      user: 'abc'
    }
    let myInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/api/ride', myInit)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <Fragment>
        <InputBoxes
          updateOrigin={this.updateOrigin.bind(this)}
          updateDestination={this.updateDestination.bind(this)}
        />
        <button onCLick={this.findRide.bind(this)}>Find Ride</button>
        <Map
          origin={this.state.origin.latLng}
          destination={this.state.destination.latLng}
          userPos={this.state.userPos}
          drivers={this.state.drivers} />
      </Fragment>
    )
  }
}

export default User
