import React, {Component, Fragment} from 'react'
import './LoginPage.css'
import UserLogin from '../userLogin/userLogin'

class loginPage extends Component {
  constructor () {
    super()
    this.state = {
      userUrl: '',
      driverUrl: ''
    }
  }
  componentWillMount () {
    fetch('/api/user/loginUrl')
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({userUrl: result.url})
      })
    fetch('/api/driver/loginUrl')
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({driverUrl: result.url})
      })
  }
  render () {
    return (
      <Fragment>
        <div className='columns' id='login'>
          <div className='column'>
            <UserLogin
              name='User'
              url={this.state.userUrl}
            />
          </div>
          <div className='column'>
            <UserLogin
              name='Driver'
              url={this.state.driverUrl} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default loginPage
