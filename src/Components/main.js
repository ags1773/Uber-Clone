import React, {Component, Fragment} from 'react'
import {Route} from 'react-router-dom'
import client from 'socket.io-client'
import config from '../config'
import HomeComponent from './homeComponent/homeComponent'
import User from './user/user'
import DriverWait from './driver/driverWait/driverWait'

// Global vars
let socket
// let tempDriverID = '5bcfcc921c9d440000ac95a2' // mock...This will come from google redirect
let tempDriverID = '5bc814bfbc69243ce7e707d3' // mock...This will come from google redirect

class Main extends Component {
  componentWillMount () {
    socket = client(config.server) // creates socket
  }
  render () {
    return (
      <Fragment>
        {/* <Route exact path='/' component={HomeComponent} /> */}
        <Route exact path='/' render={props => <HomeComponent {...props} />} />
        <Route path='/user' render={(props) => <User {...props} socket={socket} />} />
        <Route path='/driver' render={(props) => <DriverWait {...props} socket={socket} driverID={tempDriverID} />} />
      </Fragment>
    )
  }
}

export default Main
