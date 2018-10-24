import React, {Component, Fragment} from 'react'
import UserLogin from '../userLogin/userLogin'

class homeComponent extends Component {
  loginUser () {
    fetch('/api/user/login', {
      mode: 'no-cors'
    })
      .then((result) => {
        console.log('USER RESULT', result)
        this.props.history.push('/user')
      })
  }
  render () {
    return (
      <Fragment>
        <div className='columns'>
          <div className='column'>
            <UserLogin
              name='User'
              onLogin={this.loginUser.bind(this)}
            />
          </div>
          {/* <div className='column'>
            <UserLogin name='Driver' />
          </div> */}
        </div>
      </Fragment>
    )
  }
}

export default homeComponent
