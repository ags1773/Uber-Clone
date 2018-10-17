import React, {Component} from 'react'
import './map.css'

let map, marker, directionsService, directionsDisplay

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

  componentWillUpdate () {
    if (!this.isEmpty(this.props.origin) && !this.isEmpty(this.props.destination)) {
      directionsDisplay.setMap(map)
      directionsService.route({
        origin: this.props.origin,
        destination: this.props.destination,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      })
    }
    map.setCenter(this.props.userPos)
    marker.setMap(map)
    marker.setPosition(this.props.userPos)
  }

  isEmpty (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  render () {
    return (
      <div id='map' />
    )
  }
}

export default Map
