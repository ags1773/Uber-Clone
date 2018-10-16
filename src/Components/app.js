import React, {Component, Fragment} from 'react'
import InputBoxes from './inputBoxes'
import Map from './map'

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
      userPos: {lat: 28.7041, lng: 77.1025}
    }
  }
  componentDidMount () {
    loadScript(script)
      .then(() => this.setState({scriptLoaded: true}))
      // .catch(e => console.log(e))
    let geoSuccess = position => {
      this.setState({pos: {lat: position.coords.latitude, lng: position.coords.longitude}})
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
    console.log('Origin coordn updated!', this.state)
  }
  updateDestinationCoordinates (lat, lng) {
    this.setState({destination: {lat: lat, lng: lng}})
    console.log('Destination coordn updated!', this.state)
  }

  render () {
    if (this.state.scriptLoaded) {
      return (
        <Fragment>
          <InputBoxes
            updateOriginCoordinates={this.updateOriginCoordinates.bind(this)}
            updateDestinationCoordinates={this.updateDestinationCoordinates.bind(this)}
          />
          <Map origin={this.state.origin} destination={this.state.destination} userPos={this.state.userPos} />
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
