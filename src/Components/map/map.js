import React, {Component} from 'react'
import './map.css'

let map, marker, directionsService, directionsDisplay

class Map extends Component {
  componentDidMount () {
    console.log('props >>', this.props)
    map = new google.maps.Map(document.getElementById('map'), {
      center: this.props.userPos,
      zoom: 15
    })
    marker = new google.maps.Marker()
    directionsService = new google.maps.DirectionsService()
    directionsDisplay = new google.maps.DirectionsRenderer()
  }

  componentWillUpdate () {
    //display travel route
    if (!this.isEmpty(this.props.origin) && !this.isEmpty(this.props.destination)) {
      directionsDisplay.setMap(map)
      directionsService.route({
        origin: {lat: this.props.origin.lat,
          lng: this.props.origin.lng},
        destination: {lat: this.props.destination.lat,
          lng: this.props.destination.lng},
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      })
    }
    //display user position
    map.setCenter(this.props.userPos)
    marker.setMap(map)
    marker.setPosition(this.props.userPos)
    //display drivers near user
    if (this.props.drivers.length !== 0) {
      let drivers = this.props.drivers
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
