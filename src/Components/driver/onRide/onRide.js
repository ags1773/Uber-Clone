import React, {Component, Fragment} from 'react'
import Map from '../../map/map'
import {intervalFunction} from '../../../helperFunctions'
import config from '../../../config'

class OnRide extends Component {
  constructor (props) {
    super(props)
    this.state = {
      destination: this.props.mapRenderData.destination
    }
    this.prevLat = 0
    this.prevLng = 0
    this.setId = setInterval(intervalFunction.bind(this, (lat, lng) => {
      this.setState({
        origin: {lat: lat, lng: lng}
      }, () => {
        this.props.socket.emit('relayRideInfo', {
          origin: this.state.origin,
          destination: this.props.mapRenderData.destination
        })
      })
    }), config.driverCoordBroadcastTimeout * 1000)
  }
  componentWillUnmount () {
    clearInterval(this.setId)
  }
  render () {
    if (this.state.origin && this.state.destination) {
      return (
        <Fragment>
          <div class='container' id='onRide'>
            <div class='content'>
              <p class='is-size-3 has-text-centered has-text-dark is-uppercase'>Rider drop!</p>
              <p><strong>Destination Address: </strong>{this.props.mapRenderData.destinationAddress}</p>
            </div>
            <div class='control'>
              <button class='button is-dark' onClick={this.props.endRide}>End Ride</button>
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
        <h1>Please Wait...</h1>
      )
    }
  }
}

export default OnRide
