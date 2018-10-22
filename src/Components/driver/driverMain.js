import React, {Component, Fragment} from 'react'
import {Route, Link} from 'react-router-dom'
import DriverRequested from './driverRequested/driverRequested'
import DriverWait from './driverWait/driverWait'

// ****** INFO ******
// child of 'main' component
// parent of all driver components
// contains router links

class DriverMain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rideFound: false,
      rideDetails: {}
    }
    render () {}
  }
}

export default DriverMain
