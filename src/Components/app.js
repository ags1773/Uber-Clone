import React, {Component, Fragment} from 'react'
import InputBox from './inputBox'
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
      origin: {lat: 12.9615, lng: 77.6442},
      destination: {lat: 12.9793, lng: 77.6406},
      userPos: {lat: 28.7041, lng: 77.1025}
    }
  }
  componentDidMount () {
    loadScript(script)
      .then(() => this.setState({scriptLoaded: true}))
      .catch(e => console.log(e))
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

  render () {
    if (this.state.scriptLoaded) {
      return (
        <Fragment>
          <InputBox />
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
