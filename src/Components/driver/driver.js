import React, {Component} from 'react'
import DriverWait from './driverWait/driverWait'
import DriverRequested from './driverRequested/driverRequested'
import DriverMap from './driverMap/driverMap'

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
  setRideDetailsState (rideDetails) {
    this.setState({
      rideDetails: rideDetails,
      status: 'rideAssign'
    })
  }
  setMapState (obj) {
    this.setState({
      status: 'driverMap1',
      mapRenderData: obj
    })
  }

  render () {
    let component
    switch (this.state.status) {
      case 'waiting':
        component = <DriverWait socket={this.props.socket} driverID={this.state.driver._id} setRideDetailsState={this.setRideDetailsState.bind(this)} />
        break
      case 'rideAssign':
        component = <DriverRequested socket={this.props.socket} rideDetails={this.state.rideDetails} setMapState={this.setMapState.bind(this)} resetRideStatus={this.resetRideStatus.bind(this)} />
        break
      case 'driverMap1':
        component = <DriverMap mapRenderData={this.state.mapRenderData} />
    }
    return component
  }
}

export default Driver
