import React, {Component} from 'react'
import './driverRequested.css'

class DriverRequested extends Component {
  componentWillMount () {
    // fetch()
  }
  render () {
    return (
      <h2>----</h2>
    )
  }
}

// function DriverRequested (props) {
//   return (
//     <div className='container' id='driverRequested'>
//       <p className='is-size-3 has-text-centered is-uppercase'>Ride request recieved!</p>
//       <p>Name: {props.userDetails.name}</p>
//       <p>Origin: {props.userDetails.origin}</p>
//       <p>Destination: {props.userDetails.destination}</p>
//       <div className='buttons'>
//         <button className='button is-dark'>Accept</button>
//         <button className='button is-dark'>Decline</button>
//       </div>
//     </div>
//   )
// }

export default DriverRequested

// expected prop.userDetails =
// {
//   name: 'John Doe',
//   origin: {lat: 12.9716, lng: 77.5946},
//   destination: {lat: 13.1516, lng: 76.4146}
// }
