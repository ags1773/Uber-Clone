import React, {Component, Fragment} from 'react'
import {Route, Link} from 'react-router-dom'
import HomeComponent from './homeComponent/homeComponent'
import User from './user/user'
import DriverWait from './driver/driverWait/driverWait'
import DriverRequested from './driver/driverRequested/driverRequested'

const tempObj = { // dummy prop for driverRequested component
  userDetails: {
    name: 'John Doe',
    origin: {lat: 12.9716, lng: 77.5946, address: 'bla bla'},
    destination: {lat: 13.1516, lng: 76.4146, address: 'bla bla'}
  }
}

class Main extends Component {
  render () {
    return (
      <Fragment>
        <div className='has-background-grey-light'>
          <li>--- Temporary ---</li>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/user'>User</Link></li>
          <li><Link to='/driverWait'>DriverWait</Link></li>
          <li><Link to='/driverRequested'>DriverRequested</Link></li>
          <li>-----------------</li>
        </div>
        <Route exact path='/' component={HomeComponent} />
        <Route path='/user' component={User} />
        <Route path='/driverRequested' render={() => (
          <DriverRequested {...tempObj} />
        )} />
        <Route path='/driverWait' component={DriverWait} />
      </Fragment>
    )
  }
}

export default Main
