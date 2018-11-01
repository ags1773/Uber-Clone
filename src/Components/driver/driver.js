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
        console.log('DRIVER ', driver)
        this.setState({driver: driver})
        this.props.onLogin(driver)
      })
      .catch(err => {
        console.log('ERROR ', err)
      })
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
      this.state.status === 'waiting'
        ? <DriverWait socket={this.props.socket} driverID='ffgsfgdfgd' setRideDetailsState={this.setRideDetailsState.bind(this)} />
        : null
    )
  }
}

export default Driver


{/* <Route exact path='/driver' render={(props) => <DriverWait {...props} socket={socket} driverID={tempDriverID} setRideDetailsState={this.setRideDetailsState.bind(this)} />} />
<Route path='/driver/driverRequested' render={props => <DriverRequested {...props} socket={socket} rideDetails={this.state.rideDetails} setMapState={this.setMapState.bind(this)} />} />
<Route path='/driver/map' render={props => <DriverMap {...props} mapRenderData={this.state.mapRenderData} />} /> */}
     