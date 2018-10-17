import React, {Component, Fragment} from 'react'
import InputBoxes from './inputBoxes'
import Map from './map'
import NavBar from './navBar/navBar'
import HomeComponent from './homeComponent/homeComponent'

let watchId
const script = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`
function loadScript (src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = src
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', e => reject(e))
    document.body.appendChild(script)
  })
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      scriptLoaded: false,
      origin: {},
      destination: {},
      userPos: {},
      something: 0
    }
  }
  componentWillMount () {
    loadScript(script)
      .then(() => this.setState({scriptLoaded: true}))
      .catch(e => console.log(e))
    let geoSuccess = position => {
      this.setState({userPos: {lat: position.coords.latitude, lng: position.coords.longitude}})
    }
    let geoError = () => {
      console.log('No position available')
    }
    let options = {
      enableHighAccuracy: true
    }
    watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, options)
  }
  componentWillUnmount () {
    navigator.geolocation.clearWatch(watchId)
  }
  updateOriginCoordinates (lat, lng) {
    this.setState({origin: {lat: lat, lng: lng}})
  }
  updateDestinationCoordinates (lat, lng) {
    this.setState({destination: {lat: lat, lng: lng}})
  }

  render () {
    if (this.state.scriptLoaded) {
      return (
        <Fragment>
          <NavBar />
          <HomeComponent />
          <InputBoxes
            updateOriginCoordinates={this.updateOriginCoordinates.bind(this)}
            updateDestinationCoordinates={this.updateDestinationCoordinates.bind(this)}
          />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <h2>Could not load google script</h2>
        </Fragment>
      )
    }
  }
}

export default App

{/* <Map origin={this.state.origin} destination={this.state.destination} userPos={this.state.userPos} /> */}