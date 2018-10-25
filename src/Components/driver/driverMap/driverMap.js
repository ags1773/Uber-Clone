import React, {Component, Fragment} from 'react'
import Map from '../../map/map'

class DriverMap extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    console.log('Props >>', this.props)
  }
  render () {
    return (
      <Fragment>
        <h2>Driver's Map goes here</h2>
      </Fragment>
    )
  }
}

export default DriverMap
