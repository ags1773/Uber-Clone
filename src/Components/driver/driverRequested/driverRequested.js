import React, {Component, Fragment} from 'react'
import './driverRequested.css'

class DriverRequested extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rideAccepted: false,
      rideDeclined: false
    }
  }
  acceptRide () {
    this.setState({rideAccepted: true})
  }
  declineRide () {
    this.setState({rideDeclined: true})
  }
  render () {
    return (
      <div className='container' id='driverRequested'>
        <p className='is-size-3 has-text-centered is-uppercase'>Ride request received!</p>
        <p><strong>Name:</strong> {this.props.userDetails.name}</p>
        <p><strong>Origin:</strong> {this.props.userDetails.origin.address}</p>
        <p><strong>Destination:</strong> {this.props.userDetails.destination.address}</p>
        <div className='buttons'>
          <button className='button is-dark' onClick={this.acceptRide}>Accept</button>
          <button className='button is-dark' onClick={this.declineRide}>Decline</button>
        </div>
      </div>
    )
  }
}

export default DriverRequested

// Input to component >>> prop.userDetails =
// {
//   name: 'John Doe',
//   origin: {lat: 12.9716, lng: 77.5946, address: 'bla bla'},
//   destination: {lat: 13.1516, lng: 76.4146, address: 'bla bla'}
// }
