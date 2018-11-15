import React, {Component, Fragment} from 'react'
import Map from '../../map/map'
import {intervalFunction} from '../../../helperFunctions'
import config from '../../../config'
let socket

class DriverToUserMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      destination: this.props.mapRenderData.userLocation
    }
    socket = this.props.socket
  }
  componentWillMount () {
    this.prevLat = 0
    this.prevLng = 0
    this.setId = setInterval(intervalFunction.bind(this, (lat, lng) => {
      this.setState({
        origin: {lat: lat, lng: lng}
      })
      const payload = {
        lat: lat,
        lng: lng
      }
      socket.emit('relayDriverPosition', payload)
    }), config.driverCoordBroadcastTimeout * 1000)
  }
  componentWillUnmount () {
    clearInterval(this.setId)
  }
  render () {
    if (this.state.origin && this.state.destination) {
      return (
        <Fragment>
          <div class='container' id='driverToUserMap'>
            <div class='content'>
              <p class='is-size-3 has-text-centered has-text-dark is-uppercase'>Rider pickup!</p>
              <p><strong>Pickup Address: </strong>{this.props.mapRenderData.userAddress}</p>
            </div>
            <div class='control'>
              <button class='button is-dark' onClick={this.props.startRide}>Start Ride</button>
            </div>
          </div>
          <Map
            origin={this.state.origin}
            destination={this.state.destination}
          />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <h1>Please Wait</h1>
        </Fragment>
      )
    }
  }
}

export default DriverToUserMap
