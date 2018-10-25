import React from 'react'
import './driverRequested.css'
import config from '../../../config'
import {getCurrLocation} from '../../../helperFunctions'

function rideAccepted (props) { // set map origin destination & render map component
  getCurrLocation()
    .then(pos => {
      let crd = pos.coords
      console.log('Driver lat, long, accuracy >>', crd.latitude, crd.longitude, crd.accuracy)
      if (crd.accuracy <= config.driverMinAccuracy) {
        const obj = { // origin => driver's location, destination => user's location
          origin: {lat: crd.latitude, lng: crd.longitude},
          destination: {lat: props.userDetails.origin.lat, lng: props.userDetails.origin.lng},
          userPos: {lat: crd.latitude, lng: crd.longitude}
        }
        props.setMapState(obj, () => props.history.push('/driver/map'))
      } else console.log(`Driver's location inaccurate... Accuracy = ${crd.accuracy}, threshold = ${config.driverMinAccuracy}`)
    })
    .catch(e => console.log('Error getting driver location ', e))
}
function rideDeclined (props) {
  props.socket.emit('rideDeclined')
  props.history.goBack()
}

function DriverRequested (props) {
  return (
    <div className='container' id='driverRequested'>
      <p className='is-size-3 has-text-centered is-uppercase'>Ride request received!</p>
      <p><strong>Name:</strong> {props.userDetails.name}</p>
      <p><strong>Origin:</strong> {props.userDetails.origin.address}</p>
      <p><strong>Destination:</strong> {props.userDetails.destination.address}</p>
      <div className='buttons'>
        <button className='button is-dark' onClick={rideAccepted.bind(this, props)}>Accept</button>
        <button className='button is-dark' onClick={rideDeclined.bind(this, props)}>Decline</button>
      </div>
    </div>
  )
}

export default DriverRequested

// Input to component >>> prop.userDetails =
// {
//   name: 'John Doe',
//   origin: {lat: 12.9716, lng: 77.5946, address: 'bla bla'},
//   destination: {lat: 13.1516, lng: 76.4146, address: 'bla bla'}
// }
