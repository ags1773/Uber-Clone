import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import HomeComponent from './homeComponent/homeComponent'
import User from './user/user'
import Driver from './driver/driver'

let watchId
let options = {
  enableHighAccuracy: true
}
let geoError = () => {
  console.log('No position available')
}

class Main extends Component {
  constructor () {
    super()
    this.state = {
      origin: {},
      destination: {},
      userPos: {}
    }
  }

  // ---- Functions ----
  geoSuccess (position) {
    this.setState({userPos: {lat: position.coords.latitude, lng: position.coords.longitude}})
  }
  updateOriginCoordinates (lat, lng) {
    this.setState({origin: {lat: lat, lng: lng}})
  }
  updateDestinationCoordinates (lat, lng) {
    this.setState({destination: {lat: lat, lng: lng}})
  }

  // ---- Lifecycle Hooks ----
  componentWillMount () {
    watchId = navigator.geolocation.watchPosition(this.geoSuccess.bind(this), geoError, options)
  }
  componentWillUnmount () {
    navigator.geolocation.clearWatch(watchId)
  }

  // ---- Render Function ----
  render () {
    return (
      <div>
        <Route exact path='/' component={HomeComponent} />
        <Route path='/user' component={User} />
        <Route path='/driver' component={Driver} />
      </div>
    )
  }
}

export default Main
