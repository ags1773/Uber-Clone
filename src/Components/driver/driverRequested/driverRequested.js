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
          destination: {lat: props.rideDetails.origin.lat, lng: props.rideDetails.origin.lng},
          userPos: {lat: crd.latitude, lng: crd.longitude}
        }
        props.setMapState(obj)
      } else console.log(`Driver's location inaccurate... Accuracy = ${crd.accuracy}, threshold = ${config.driverMinAccuracy}`)
    })
    .catch(e => console.log('Error getting driver location ', e))
}
function rideDeclined (props) {
  props.socket.emit('rideDeclined')
}
function simulateRideCancelled (props) { // temperory.. for testing purpose
  props.socket.emit('EmitRideCancelled')
}

function DriverRequested (props) {
  props.socket.on('rideCancelled', () => { // fired when some other driver accepts the ride
    console.log('rideCancelled!!')
    props.resetRideStatus()
  })

  return (
    <div className='container' id='driverRequested'>
      <p className='is-size-3 has-text-centered is-uppercase'>Ride request received!</p>
      <p><strong>Name:</strong> {props.rideDetails.name}</p>
      <p><strong>Origin:</strong> {props.rideDetails.origin.address}</p>
      <p><strong>Destination:</strong> {props.rideDetails.destination.address}</p>
      <div className='buttons'>
        <button className='button is-dark' onClick={rideAccepted.bind(this, props)}>Accept</button>
        <button className='button is-dark' onClick={rideDeclined.bind(this, props)}>Decline</button>
        <button className='button is-dark' onClick={simulateRideCancelled.bind(this, props)}>Simulate Ride Cancelled</button>
      </div>
    </div>
  )
}

export default DriverRequested

// Input to component >>> prop.rideDetails =
// {
//   name: 'John Doe',
//   origin: {lat: 12.9716, lng: 77.5946, address: 'bla bla'},
//   destination: {lat: 13.1516, lng: 76.4146, address: 'bla bla'}
// }
