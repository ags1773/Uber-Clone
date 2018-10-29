import React, {Component, Fragment} from 'react'
import UserLogin from '../userLogin/userLogin'

class homeComponent extends Component {
  render () {
    return (
      <Fragment>
        <div className='columns'>
          <div className='column'>
            <UserLogin
              name='User'
            />
          </div>
          <div className='column'>
            <UserLogin name='Driver' />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default homeComponent
