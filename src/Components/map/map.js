import React, {Component} from 'react'
import './map.css'

let map, marker, directionsService, directionsDisplay

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userPos: this.props.userPos,
      origin: this.props.origin,
      destination: this.props.destination,
      drivers: this.props.drivers
    }
  }
  componentDidMount () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: this.state.userPos,
      zoom: 15
    })
    marker = new google.maps.Marker()
    directionsService = new google.maps.DirectionsService()
    directionsDisplay = new google.maps.DirectionsRenderer()
  }

  componentWillReceiveProps (props) {
    // display travel route
    // if (!this.isEmpty(this.props.origin) && !this.isEmpty(this.props.destination)) {
    console.log('$$$ >>', props)
    this.setState({
      userPos: props.userPos,
      origin: props.origin,
      destination: props.destination,
      drivers: props.drivers
    })
    map.setCenter(props.origin)
    console.log('Map props >>', props)
    if (this.isValid(this.state.origin) && this.isValid(this.state.destination)) {
      directionsDisplay.setMap(map)
      directionsService.route({
        // origin: this.props.origin,
        origin: {lat: this.state.origin.lat, lng: this.state.origin.lng},
        destination: {lat: this.state.destination.lat, lng: this.state.destination.lng},
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
    map.setCenter(this.state.userPos) // centers map to user position
    marker.setMap(map)
    marker.setPosition(this.state.userPos)
    // display drivers near user
    if (this.state.drivers.length !== 0) {
      let drivers = this.state.drivers
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

  isValid (obj) {
    let flag = false
    Object.keys(obj).forEach(k => {
      if (obj[k]) flag = true
      else flag = false
    })
    return flag
  }
  // isEmpty (obj) {
  //   if (obj) {
  //     return Object.keys(obj).length === 0 && obj.constructor === Object
  //   }
  //   return true
  // }

  render () {
    return (
      <div id='map' />
    )
  }
}

export default Map
