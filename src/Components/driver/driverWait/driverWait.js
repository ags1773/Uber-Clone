import React, {Component} from 'react'
import './driverWait.css'
import config from '../../../config'
import {geodesicInMtrs, getCurrLocation} from '../../../helperFunctions'
let socket, driverID

function intervalFunction () {
  getCurrLocation()
    .then(pos => {
      let crd = pos.coords
      console.log('Driver lat, long, accuracy >>', crd.latitude, crd.longitude, crd.accuracy)
      if (crd.accuracy <= config.driverMinAccuracy) {
        if (this.prevLat && this.prevLng) {
          if (geodesicInMtrs(this.prevLat, this.prevLng, crd.latitude, crd.longitude) > config.driverMinDist) {
            console.log(`Driver moving.. transmitting location to server`)
            transmitDriverLocToServer(crd.latitude, crd.longitude)
          } else {
            console.log(`Driver hasn't moved more than ${config.driverMinDist} mtr... Did NOT transmit location to server`)
          }
        } else {
          console.log('Transmitting 1st reading...')
          transmitDriverLocToServer(crd.latitude, crd.longitude)
        }
        this.prevLat = crd.latitude
        this.prevLng = crd.longitude
      } else console.log(`Driver's location inaccurate... Accuracy = ${crd.accuracy}, threshold = ${config.driverMinAccuracy}`)
    })
    .catch(e => console.log('Error getting driver location ', e))
}
function transmitDriverLocToServer (lat, lng) {
  const payload = {
    id: driverID,
    position: [lat, lng]
  }
  socket.emit('driverPosition', JSON.stringify(payload))
}

class DriverWait extends Component {
  constructor (props) {
    super(props)
    this.state = {
      //
    }
    socket = this.props.socket
    driverID = this.props.driverID
    socket.emit('userType', 'driver', driverID)
  }
  componentWillMount () {
    this.setId = setInterval(intervalFunction.bind(this), config.driverCoordBroadcastTimeout * 1000)
    this.prevLat = 0
    this.prevLng = 0
  }
  componentDidMount () {
    document.getElementById('EmitRideAssigned').addEventListener('click', // for testing purpose
      () => socket.emit('EmitRideAssigned')
    )
    socket.on('rideAssigned', rideDetails => { // sets state in main component and redirects once done
      this.props.setRideDetailsState(rideDetails)
    })
  }
  componentWillUnmount () {
    clearInterval(this.setId)
  }
  render () {
    return (
      <div className='container' id='driverWait' >
        <div><button id='EmitRideAssigned'>Simulate ride assignment</button></div>
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
