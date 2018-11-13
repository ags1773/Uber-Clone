import React, {Component, Fragment} from 'react'
import Map from '../../map/map'
import {intervalFunction} from '../../../helperFunctions'
import config from '../../../config'
let socket, driverID, userID

function relayDriverLocToUser (lat, lng) { // callback to intervalFunction
  const payload = {
    id: driverID,
    position: [lat, lng]
  }
  socket.emit('relayDriverPosition', JSON.stringify(payload), userID)
}

class DriverToUserMap extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    socket = this.props.socket
    driverID = this.props.driverID
    userID = this.props.userID
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
