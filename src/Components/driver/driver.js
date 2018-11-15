import React, {Component} from 'react'
import DriverWait from './driverWait/driverWait'
import DriverRequested from './driverRequested/driverRequested'
import DriverToUserMap from './driverToUserMap/driverToUserMap'
import OnRide from './onRide/onRide'
import EndRide from './endRide/endRide'
import {calculatePrice} from '../../helperFunctions'

class Driver extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'waiting',
      rideDetails: {},
      mapRenderData: {},
      driver: {}
    }
  }

  componentWillMount () {
    fetch('/api/driver/driverDetails')
      .then(res => {
        return res.json()
      })
      .then(driver => {
        this.setState({driver: driver})
        this.props.socket.emit('userType', 'driver', driver._id)
        this.props.onLogin(driver)
      })
      .catch(err => {
        console.log('ERROR ', err)
      })
  }
  resetRideStatus () {
    this.setState({
      status: 'waiting',
      rideDetails: {}
    })
  }
  async setRideDetailsState (rideDetails) {
    let price = await calculatePrice(rideDetails.origin, rideDetails.destination)
    this.setState({
      rideDetails: rideDetails,
      status: 'rideAssign',
      price: price
    })
  }
  setMapState (obj) {
    this.setState({
      status: 'driverToUserMap',
      mapRenderData: obj
    })
  }
  startRide () {
    this.setState({
      status: 'onRide'
    })
  }
  endRide () {
    this.setState({
      status: 'endRide'
    })
  }

  render () {
    let component
    switch (this.state.status) {
      case 'waiting':
        component = <DriverWait
          socket={this.props.socket}
          driverID={this.state.driver._id}
          setRideDetailsState={this.setRideDetailsState.bind(this)} />
        break
      case 'rideAssign':
        component = <DriverRequested
          socket={this.props.socket}
          rideDetails={this.state.rideDetails}
          setMapState={this.setMapState.bind(this)}
          resetRideStatus={this.resetRideStatus.bind(this)} />
        break
      case 'driverToUserMap':
        component = <DriverToUserMap
          socket={this.props.socket}
          mapRenderData={this.state.mapRenderData}
          startRide={this.startRide.bind(this)} />
        break
      case 'onRide':
        component = <OnRide
          socket={this.props.socket}
          mapRenderData={this.state.mapRenderData}// send destination address
          endRide={this.endRide.bind(this)} />
        break
      case 'endRide':
        component = <EndRide
          socket={this.props.socket}
          mapRenderData={this.state.mapRenderData}
          resetRideStatus={this.resetRideStatus.bind(this)}
          price={this.state.price} />
    }
    return component
  }
}

export default Driver
