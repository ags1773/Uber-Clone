import React from 'react'
import './driverRequested.css'
import config from '../../../config'
import {getCurrLocation} from '../../../helperFunctions'

function rideAccepted (props) { // set map origin destination & render map component
  props.socket.emit('rideAccepted')
  getCurrLocation()
    .then(pos => {
      let crd = pos.coords
      console.log('Driver lat, long, accuracy >>', crd.latitude, crd.longitude, crd.accuracy)
      if (crd.accuracy <= config.driverMinAccuracy) {
        const obj = { // origin => driver's location, destination => user's location
          origin: {lat: crd.latitude, lng: crd.longitude},
          // destination: {lat: props.rideDetails.origin.lat, lng: props.rideDetails.origin.lng},
          userLocation: {lat: props.rideDetails.origin.lat, lng: props.rideDetails.origin.lng},
          destination: {lat: props.rideDetails.destination.lat, lng: props.rideDetails.destination.lng},
          userPos: {lat: crd.latitude, lng: crd.longitude},
          userAddress: props.rideDetails.origin.address,
          destinationAddress: props.rideDetails.destination.address
        }
        props.setMapState(obj)
      } else console.log(`Driver's location inaccurate... Accuracy = ${crd.accuracy}, threshold = ${config.driverMinAccuracy}`)
    })
    .catch(e => console.log('Error getting driver location ', e))
}
function rideDeclined (props) {
  // props.socket.emit('rideDeclined')
  props.resetRideStatus()
}

function DriverRequested (props) {
  props.socket.on('rideCancelled', () => { // fired when some other driver accepts the ride
    console.log('rideCancelled!!')
    props.resetRideStatus()
  })

  return (
    <div className='hero is-medium is-light is-bold' id='driverRequested'>
      <div className='hero-head'>
        <p className='is-size-3 has-text-centered has-text-dark is-uppercase'>Ride request received!</p>
      </div>
      <div className='hero-body'>
        <div className='content is-medium has-text-dark'>
          <p><strong>Name:</strong> {props.rideDetails.name}</p>
          <p><strong>Origin:</strong> {props.rideDetails.origin.address}</p>
          <p><strong>Destination:</strong> {props.rideDetails.destination.address}</p>
        </div>
      </div>
      <div className='hero-foot'>
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
              <button className='button is-dark' onClick={rideAccepted.bind(this, props)}>Accept</button>
            </div>
          </div>
          <div className='level-right'>
            <div className='level-item'>
              <button className='button is-dark' onClick={rideDeclined.bind(this, props)}>Decline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverRequested
