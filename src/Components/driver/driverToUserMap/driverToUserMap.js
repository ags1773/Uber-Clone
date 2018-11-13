import React, {Component, Fragment} from 'react'
import Map from '../../map/map'
import {intervalFunction} from '../../../helperFunctions'
import config from '../../../config'
let socket, driverID
const tempArr = [] // Delete me later

function relayDriverLocToUser (lat, lng) { // callback to intervalFunction
  const payload = {
    id: driverID,
    position: [lat, lng]
  }
  socket.emit('relayDriverPosition', JSON.stringify(payload))
}

class DriverToUserMap extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    socket = this.props.socket
    driverID = this.props.driverID
  }
  componentWillMount () {
    this.setId = setInterval(intervalFunction.bind(this, relayDriverLocToUser), config.driverCoordBroadcastTimeout * 1000)
    this.prevLat = 0
    this.prevLng = 0
  }
  componentWillUnmount () {
    clearInterval(this.setId)
  }
  render () {
    return (
      <Fragment>
        <h1>Driver To User Map => => =></h1>
        <Map
          userPos={this.props.mapRenderData.userPos}
          origin={this.props.mapRenderData.origin}
          destination={this.props.mapRenderData.destination}
          drivers={tempArr}
        />
      </Fragment>
    )
  }
}

export default DriverToUserMap

{/* <Map
  userPos={this.props.mapRenderData.userPos}
  origin={this.props.mapRenderData.origin}
  destination={this.props.mapRenderData.destination}
/> */}
