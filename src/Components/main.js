import React, {Component, Fragment} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import InputBoxes from './inputBoxes'
import Map from './map'
import HomeComponent from './homeComponent/homeComponent'
import Test from './test'

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
        <ul>
          <li><Link to='/user'>User</Link></li>
          <li><Link to='/test'>Test</Link></li>
        </ul>
        <Route path='/user' component={HomeComponent} />
        <Route path='/test' component={Test} />
      </div>
    )
  }
}

export default Main


{/* <Route path='/test' render={() => {
  return (
    <Fragment>
      <InputBoxes
        updateOriginCoordinates={this.updateOriginCoordinates.bind(this)}
        updateDestinationCoordinates={this.updateDestinationCoordinates.bind(this)}
      />
      <Map origin={this.state.origin} destination={this.state.destination} userPos={this.state.userPos} />
    </Fragment>
  )
}} /> */}