import React, {Component, Fragment} from 'react'
import {Route} from 'react-router-dom'
import HomeComponent from './homeComponent/homeComponent'
import User from './user/user'
import DriverWait from './driver/driverWait/driverWait'
import DriverRequested from './driver/driverRequested/driverRequested'

// Global vars
let tempDriverID = '5bc814bfbc69243ce7e707d3' // mock...This will come from google redirect
let socket

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rideDetails: {}
    }
  }
  componentWillMount () {
    socket = this.props.socket
  }
  setRideDetailsState (rideDetails, callback) {
    this.setState({
      rideDetails: rideDetails
    }, callback)
  }
  render () {
    return (
      <Fragment>
        <Route exact path='/' component={HomeComponent} />
        <Route exact path='/user' render={(props) => <User {...props} socket={socket} />} />
        <Route exact path='/driver' render={(props) => <DriverWait {...props} socket={socket} driverID={tempDriverID} setRideDetailsState={this.setRideDetailsState.bind(this)} />} />
        <Route exact path='/driver/driverRequested' render={props => <DriverRequested {...props} userDetails={this.state.rideDetails} />} />
      </Fragment>
    )
  }
}

export default Main
