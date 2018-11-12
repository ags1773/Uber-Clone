import React, {Component, Fragment} from 'react'
import './inputBoxes.css'

function isValid (obj) {
  let flag = false
  Object.keys(obj).forEach(k => {
    if (obj[k]) flag = true
    else flag = false
  })
  return flag
}
class inputBoxes extends Component {
  constructor () {
    super()
    this.state = {
      origin: {
        lat: undefined,
        lng: undefined,
        address: ''
      },
      destination: {
        lat: undefined,
        lng: undefined,
        address: ''
      }
    }
  }
  componentDidMount () {
    this.autocompleteInput('originInput')
    this.autocompleteInput('destinationInput')
  }

  updateOriginDestination () {
    if (isValid(this.state.origin) && isValid(this.state.destination)) {
      console.log('IN UPDATE FN')
      this.props.updateOriginDestination({
        origin: this.state.origin,
        destination: this.state.destination
      })
    }
  }

  autocompleteInput (id) {
    var options = {} // can restrict search results using this obj
    var input = document.getElementById(id)
    var autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace()
      const obj = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address
      }
      if (id === 'originInput') this.setState({origin: obj}, this.updateOriginDestination.bind(this))
      if (id === 'destinationInput') this.setState({destination: obj}, this.updateOriginDestination.bind(this))
    })
  }

  render () {
    return (
      <Fragment>
        <div class='level-item'>
          <input class='input' type='text' id='originInput' placeholder='Origin' />
        </div>
        <div class='level-item'>
          <input class='input' type='text' id='destinationInput' placeholder='Destination' />
        </div>
      </Fragment>
    )
  }
}

export default inputBoxes
