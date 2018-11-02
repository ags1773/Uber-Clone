import React, {Component} from 'react'
import UserHome from './userHome/userHome'
import FindRide from './findRide/findRide'

class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'renderHome'
    }
  }

  // ---- Lifecycle Hooks ----
  componentWillMount () {
    fetch('/api/user/userDetails')
      .then(res => {
        return res.json()
      })
      .then(user => {
        this.setState({user: user})
        this.props.onLogin(user)
      })
      .catch(err => {
        console.log('ERROR ', err)
      })
  }

  render () {
    let component
    switch (this.state.status) {
      case 'renderHome':
        component = <UserHome socket={this.props.socket} />
        break
      case 'findRide':
        component = <FindRide />
        break
    }
    return component
  }
}

export default User
