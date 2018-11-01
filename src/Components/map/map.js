import React, {Component} from 'react'
import './map.css'

let map, marker, directionsService, directionsDisplay
let isEmpty = function (obj) {
  if (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }
  return true
}

class Map extends Component {
  componentDidMount () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: this.props.userPos,
      zoom: 15
    })
    marker = new google.maps.Marker()
    directionsService = new google.maps.DirectionsService()
    directionsDisplay = new google.maps.DirectionsRenderer()
  }

  componentWillReceiveProps (props) {
    if (!isEmpty(props.origin) && !isEmpty(props.destination)) {
      directionsDisplay.setMap(map)
      directionsService.route({
        origin: {lat: props.origin.lat, lng: props.origin.lng},
        destination: {lat: props.destination.lat, lng: props.destination.lng},
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      })
    }
    // display user position
    map.setCenter(props.userPos) // centers map to user position
    marker.setMap(map)
    marker.setPosition(props.userPos)
    // display drivers near user
    if (props.drivers.length !== 0) {
      let drivers = props.drivers
      drivers.forEach(d => {
        let m = new google.maps.Marker({
          position: {lat: d.location.coordinates[1], lng: d.location.coordinates[0]},
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5
          }
        })
      })
    }
  }

  render () {
    return (
      <div id='map' />
    )
  }
}

export default Map
