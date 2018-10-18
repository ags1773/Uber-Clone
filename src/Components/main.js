import React, {Component, Fragment} from 'react'
import {Route, Link} from 'react-router-dom'
import HomeComponent from './homeComponent/homeComponent'
import User from './user/user'
import Driver from './driver/driverRequested/driverRequested'

class Main extends Component {
  render () {
    return (
      <Fragment>
        <div className='has-background-grey-light'>
          <li>--- Temperory ---</li>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/user'>User</Link></li>
          <li><Link to='/driver'>Driver</Link></li>
          <li>-----------------</li>
        </div>
        <Route exact path='/' component={HomeComponent} />
        <Route path='/user' component={User} />
        <Route path='/driver' component={Driver} />
      </Fragment>
    )
  }
}

export default Main
