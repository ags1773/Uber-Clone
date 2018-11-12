import React, {Component, Fragment} from 'react'
import Map from '../../map/map'

class WaitingForDriver extends Component {
  constructor (props) {
    super(props)
    this.state = {
      distance: '',
      duration: '',
      origin: this.props.origin,
      destination: this.props.destination
    }
    this.findDistance = this.findDistance.bind(this)
  }
  findDistance () {
    let service = new google.maps.DistanceMatrixService()
    let callback = (response, status) => {
      if (status !== 'OK') {
        console.log('INVALID REQUEST')
        return
      }
      let distance = response.rows[0].elements[0].distance.text
      let duration = response.rows[0].elements[0].duration.text
      this.setState({
        distance,
        duration
      })
    }
    service.getDistanceMatrix({
      origins: [this.state.origin],
      destinations: [this.state.destination],
      travelMode: 'DRIVING'
    }, callback)
  }
  componentWillMount () {
    this.findDistance()
  }
  componentWillReceiveProps (props) {
    this.setState({
      origin: props.origin,
      destination: props.destination
    }, this.findDistance)
  }
  render () {
    return (
      <Fragment>
        <div class='level'>
          <div class='level-item'>
            <p class='title'>Distance: {this.state.distance}</p>
          </div>
          <div class='level-item'>
            <p class='title'>Duration: {this.state.duration}</p>
          </div>
        </div>
        <Map
          origin={this.state.origin}
          destination={this.state.destination}
          userPos={this.state.destination}
        />
      </Fragment>
    )
  }
}

export default WaitingForDriver
