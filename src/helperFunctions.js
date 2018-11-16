import config from './config'

function deg2rad (deg) {
  return deg * (Math.PI / 180)
}

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

export function getCurrLocation () {
  const options = {
    enableHighAccuracy: true,
    timeout: config.driverGpsTimeout * 1000
  }
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

// info about intervalFunction:
// -> callback called with parameters (lat, lng)
// -> this.prevLat = 0, this.prevLng = 0 need to be declared before (in componentWillMount)
export function intervalFunction (callback) {
  getCurrLocation()
    .then(pos => {
      let crd = pos.coords
      console.log('Driver lat, long, accuracy >>', crd.latitude, crd.longitude, crd.accuracy)
      if (crd.accuracy <= config.driverMinAccuracy) {
        if (this.prevLat && this.prevLng) {
          if (geodesicInMtrs(this.prevLat, this.prevLng, crd.latitude, crd.longitude) > config.driverMinDist) {
            console.log(`Driver moving.. transmitting location to server`)
            callback(crd.latitude, crd.longitude)
          } else {
            console.log(`Driver hasn't moved more than ${config.driverMinDist} mtr... Did NOT transmit location to server`)
          }
        } else {
          console.log('Transmitting 1st reading...')
          callback(crd.latitude, crd.longitude)
        }
        this.prevLat = crd.latitude
        this.prevLng = crd.longitude
      } else console.log(`Driver's location inaccurate... Accuracy = ${crd.accuracy}, threshold = ${config.driverMinAccuracy}`)
    })
    .catch(e => console.log('Error getting driver location ', e))
}

export function findDistance (origin, destination) {
  let service = new google.maps.DistanceMatrixService()
  let callback = (response, status, resolve, reject) => {
    if (status !== 'OK') {
      reject('INVALID REQUEST')
    }
    let distance = response.rows[0].elements[0].distance.value
    let duration = response.rows[0].elements[0].duration.text
    resolve({distance: distance + 'm', duration})
  }
  return new Promise((resolve, reject) => {
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: 'DRIVING'
    }, (response, status) => callback(response, status, resolve, reject))
  })
}

export async function calculatePrice (origin, destination) {
  let {distance} = await findDistance(origin, destination)
  distance = parseInt(distance)
  distance /= 1000
  return 40 + (distance > 4 ? (distance - 4) * 15 : 0)
}
