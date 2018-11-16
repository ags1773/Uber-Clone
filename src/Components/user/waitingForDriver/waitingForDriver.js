import React, {Component, Fragment} from 'react'
import Map from '../../map/map'
import {findDistance} from '../../../helperFunctions'

class WaitingForDriver extends Component {
  constructor (props) {
    super(props)
    this.state = {
      distance: '',
      duration: '',
      origin: this.props.origin,
      destination: this.props.destination
    }
    this.updateDistance = this.updateDistance.bind(this)
  }
  async updateDistance () {
    let {distance, duration} = await findDistance(this.state.origin, this.state.destination)
    this.setState({distance, duration})
  }
  componentWillMount () {
    this.updateDistance()
  }
  componentWillReceiveProps (props) {
    this.setState({
      origin: props.origin,
      destination: props.destination
    }, this.updateDistance)
  }
  render () {
    return (
      <Fragment>
        <h1>Driver's live position:</h1>
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
