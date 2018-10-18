import React, {Component} from 'react'
import './driverWait.css'
import config from '../../../config'

function geodesicInMtrs (lat1, lon1, lat2, lon2) {
  var R = 6371000
  var dLat = deg2rad(lat2 - lat1)
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in m
  return d
}
function deg2rad (deg) {
  return deg * (Math.PI / 180)
}
function getCurrLocation () {
  const options = {
    enableHighAccuracy: true,
    timeout: config.driverGpsTimeout * 1000
  }
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
function intervalFunction () {
  getCurrLocation()
    .then(pos => {
      let crd = pos.coords
      console.log('lat, long, acc >>', crd.latitude, crd.longitude, crd.accuracy)
      if (crd.accuracy <= config.driverMinAccuracy) {
        if (this.prevLat && this.prevLng) { // ignores the 1st reading
          if (geodesicInMtrs(this.prevLat, this.prevLng, crd.latitude, crd.longitude) > config.driverMinDist) {
            console.log(`Driver moving.. transmitting location to server`)
            transmitDriverLocToServer(crd.latitude, crd.longitude)
          } else {
            console.log(`Driver hasn't moved more than ${config.driverMinDist} mtr... Did NOT transmit location to server`)
          }
        } else {
          console.log('Ignoring 1st reading...')
        }
        this.prevLat = crd.latitude
        this.prevLng = crd.longitude
      } else console.log(`Driver's location inaccurate... Accuracy = ${crd.accuracy}, threshold = ${config.driverMinAccuracy}`)
    })
    .catch(e => console.log(e))
}
function transmitDriverLocToServer (lat, lng) { // this function is mostly wrong
  let data = {
    'driverLoc': [lng, lat]
  }
  let myInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch('/api/driver/1234', myInit) // mock ID given for now
    .then(result => result.json())
    .then(() => console.log('Driver location successfully sent to server'))
    .catch(err => console.log(err.json()))
}

class DriverWait extends Component {
  componentWillMount () {
    this.setId = setInterval(intervalFunction.bind(this), config.driverCoordBroadcastTimeout * 1000)
    this.prevLat = 0
    this.prevLng = 0
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
