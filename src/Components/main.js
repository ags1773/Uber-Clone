import React, {Component, Fragment} from 'react'
import {Route} from 'react-router-dom'
import HomeComponent from './homeComponent/homeComponent'
import User from './user/user'
import Driver from './driver/driver'

class Main extends Component {
  render () {
    return (
      <Fragment>
        <Route exact path='/' component={HomeComponent} />
        <Route path='/user' component={User} />
        <Route path='/driver' component={Driver} />
      </Fragment>
    )
  }
}

export default Main
