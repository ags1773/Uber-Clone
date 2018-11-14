import React, {Component, Fragment} from 'react'
import Map from '../../map/map'
import {intervalFunction} from '../../../helperFunctions'
import config from '../../../config'
let socket

function relayDriverLocToUser (lat, lng) { // callback to intervalFunction
  const payload = {
    lat: lat,
    lng: lng
  }
  socket.emit('relayDriverPosition', payload)
}

class DriverToUserMap extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    socket = this.props.socket
    console.log('PROPS mapRenderData >>', this.props.mapRenderData)
  }
  componentWillMount () {
    this.prevLat = 0
    this.prevLng = 0
    this.setId = setInterval(intervalFunction.bind(this, relayDriverLocToUser), config.driverCoordBroadcastTimeout * 1000)
  }
  componentWillUnmount () {
    clearInterval(this.setId)
  }
  render () {
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
          userPos={this.props.mapRenderData.userPos}
          origin={this.props.mapRenderData.origin}
          destination={this.props.mapRenderData.destination}
        />
      </Fragment>
    )
  }
}

export default DriverToUserMap
