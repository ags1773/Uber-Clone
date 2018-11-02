import React, {Component} from 'react'
import UserHome from './userHome/userHome'
import FindRide from './findRide/findRide'

function setStatusAsFindRide () {
  this.setState({
    status: 'findRide'
  })
}
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

    this.props.socket.on('driversNotAvailable', () => console.log('driversNotAvailable'))
  }

  render () {
    let component
    switch (this.state.status) {
      case 'renderHome':
        component = <UserHome socket={this.props.socket} setStatusAsFindRide={setStatusAsFindRide.bind(this)} />
        break
      case 'findRide':
        component = <FindRide />
        break
    }
    return component
  }
}

export default User
