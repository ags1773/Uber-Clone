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
      origin: {},
      destination: {},
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
    console.log('Origin Updated!! >>', this.state)
  }
  updateDestination (obj) {
    this.setState({destination: obj})
    console.log('Destination Updated!! >>', this.state)
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
  render () {
    return (
      <Fragment>
        <InputBoxes
          updateOrigin={this.updateOrigin.bind(this)}
          updateDestination={this.updateDestination.bind(this)}
        />
        <button>Book Ride</button>
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
