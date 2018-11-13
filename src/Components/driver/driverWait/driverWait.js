import React, {Component} from 'react'
import './driverWait.css'
import config from '../../../config'
import {intervalFunction} from '../../../helperFunctions'
let socket, driverID

function transmitDriverLocToServer (lat, lng) { // callback to intervalFunction
  const payload = {
    id: driverID,
    position: [lat, lng]
  }
  socket.emit('driverPosition', JSON.stringify(payload))
}

class DriverWait extends Component {
  constructor (props) {
    super(props)
    socket = this.props.socket
    driverID = this.props.driverID
  }
  componentWillMount () {
    this.prevLat = 0
    this.prevLng = 0
    this.setId = setInterval(intervalFunction.bind(this, transmitDriverLocToServer), config.driverCoordBroadcastTimeout * 1000)
  }
  componentDidMount () {
    socket.on('rideAssigned', (rideDetails, userId) => { // sets state in main component and redirects once done
      this.props.setRideDetailsState(rideDetails, userId)
    })
  }
  componentWillUnmount () {
    clearInterval(this.setId)
  }
  render () {
    return (
      <div className='container' id='driverWait' >
        <p className='is-size-3 has-text-centered has-text-light is-inline-block'>Waiting for ride</p>
        <div className='lds-ripple'>
          <div />
          <div />
        </div>
      </div>
    )
  }
}

export default DriverWait
