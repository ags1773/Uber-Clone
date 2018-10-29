import React, {Component, Fragment} from 'react'
import UserLogin from '../userLogin/userLogin'

class homeComponent extends Component {
  constructor () {
    super()
    this.state = {
      url: ''
    }
  }
  componentWillMount () {
    fetch('/api/user/loginUrl')
      .then(result => {
        return result.json()
      })
      .then(result => {
        this.setState({url: result.url})
      })
  }
  render () {
    return (
      <Fragment>
        <div className='columns'>
          <div className='column'>
            <UserLogin
              name='User'
              url={this.state.url}
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
