import React, {Component, Fragment} from 'react'

class inputBoxes extends Component {
  componentDidMount () {
    this.autocompleteInput('originInput')
    this.autocompleteInput('destinationInput')
  }

  autocompleteInput (id) {
    var options = {} // can restrict search results using this obj
    var input = document.getElementById(id)
    var autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace()
      const obj = {
        latLng: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        address: place.formatted_address
      }
      if (id === 'originInput') this.props.updateOrigin(obj)
      if (id === 'destinationInput') this.props.updateDestination(obj)
    })
  }

  render () {
    return (
      <Fragment>
        <input type='text' id='originInput' placeholder='Origin' />
        <input type='text' id='destinationInput' placeholder='Destination' />
      </Fragment>
    )
  }
}

export default inputBoxes
