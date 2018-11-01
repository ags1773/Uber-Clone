import React, {Component, Fragment} from 'react'
import {Route} from 'react-router-dom'
import LoginPage from './LoginPage/LoginPage'
import User from './user/user'
import Driver from './driver/driver'

let socket

class Main extends Component {
  componentWillMount () {
    socket = this.props.socket
  }
  render () {
    return (
      <Fragment>
        <Route exact path='/' render={props => <LoginPage {...props} />} />
        <Route exact path='/user' render={(props) => <User {...props} socket={socket} onLogin={this.props.onCustomerLogin} />} />
        <Route exact path='/driver' render={props => <Driver {...props} socket={socket} onLogin={this.props.onCustomerLogin} />} />
      </Fragment>
    )
  }
}

export default Main
