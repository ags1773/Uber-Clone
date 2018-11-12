import React, {Component, Fragment} from 'react'
import client from 'socket.io-client'
import config from '../config'
import NavBar from './navBar/navBar'
import {Route} from 'react-router-dom'
import LoginPage from './LoginPage/LoginPage'
import User from './user/user'
import Driver from './driver/driver'
import Profile from './profile/profile'

const script = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`
function loadScript (src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = src
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', e => reject(e))
    document.body.appendChild(script)
  })
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      scriptLoaded: false,
      socket: undefined,
      loggedInCustomer: {}
    }
    this.getCustomer = this.getCustomer.bind(this)
  }
  componentWillMount () {
    loadScript(script)
      .then(() => {
        this.setState({
          scriptLoaded: true,
          socket: client(config.server) // creates socket
        })
      })
      .catch(e => console.log(e))
  }

  getCustomer (customer) {
    this.setState({loggedInCustomer: customer})
  }

  render () {
    if (this.state.scriptLoaded) {
      return (
        <Fragment>
          <Route path='/' render={() => <NavBar user={this.state.loggedInCustomer} />} />
          <Route exact path='/' render={props => <LoginPage {...props} />} />
          <Route exact path='/user' render={props => <User {...props} socket={this.state.socket} onLogin={customer => { this.getCustomer(customer) }} />} />
          <Route exact path='/driver' render={props => <Driver {...props} socket={this.state.socket} onLogin={customer => { this.getCustomer(customer) }} />} />
          <Route exact path='/profile' render={() => <Profile user={this.state.loggedInCustomer} />} />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <h2>Could not load google script</h2>
        </Fragment>
      )
    }
  }
}

export default App
