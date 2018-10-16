import React, {Component} from 'react'
import './map.css'

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      origin: this.props.origin,
      destination: this.props.destination,
      userPos: this.props.userPos
    }
  }

  componentDidMount () {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: this.state.userPos,
      zoom: 15
    })
    let marker = new google.maps.Marker({
      position: this.state.userPos,
      map: map
    })
    this.setState({map, marker})

    // display routes
    let directionsService = new google.maps.DirectionsService
    let directionsDisplay = new google.maps.DirectionsRenderer
    directionsDisplay.setMap(map)
    directionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response)
      } else {
        window.alert('Directions request failed due to ' + status)
      }
    })
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    let newState = {}
    let f = 0
    if (prevState.userPos === nextProps.userPos) {
      f = 1
      newState['userPos'] = nextProps.userPos
    }
    if (prevState.origin === nextProps.origin) {
      f = 1
      newState['origin'] = nextProps.origin
    }
    if (prevState.destination === nextProps.destination) {
      f = 1
      newState['destination'] = nextProps.destination
    }
    if (f) return (newState)
    return null
  }

  render () {
    return (
      <div id='map' />
    )
  }
}

export default Map
