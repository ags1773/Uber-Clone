import React, {Component, Fragment} from 'react'
import {Route} from 'react-router-dom'
import HomeComponent from './homeComponent/homeComponent'
import User from './user/user'
import DriverWait from './driver/driverWait/driverWait'
import DriverRequested from './driver/driverRequested/driverRequested'
import DriverMap from './driver/driverMap/driverMap'

// Global vars
let tempDriverID = '5bc814bfbc69243ce7e707d3' // mock...This will come from google redirect
let tempUserID = '5bd29d791c9d440000cd773a'
let socket

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rideDetails: {},
      mapRenderData: {}
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
  setMapState (obj, callback) {
    this.setState({
      mapRenderData: obj
    }, callback)
  }
  render () {
    return (
      <Fragment>
        <Route exact path='/' render={props => <HomeComponent {...props} />} />
        <Route exact path='/user' render={(props) => <User {...props} socket={socket} userID={tempUserID} />} />
        <Route exact path='/driver' render={(props) => <DriverWait {...props} socket={socket} driverID={tempDriverID} setRideDetailsState={this.setRideDetailsState.bind(this)} />} />
        <Route path='/driver/driverRequested' render={props => <DriverRequested {...props} socket={socket} userDetails={this.state.rideDetails} setMapState={this.setMapState.bind(this)} />} />
        <Route path='/driver/map' render={props => <DriverMap {...props} mapRenderData={this.state.mapRenderData} />} />
      </Fragment>
    )
  }
}

export default Main
