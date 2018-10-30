import React from 'react'
import './userLogin.css'

class userLogin extends React.Component {
  render () {
    return (
      <div id='userLogin'>
        <p className='is-block is-size-3 has-text-centered is-uppercase'>{this.props.name}</p>
        <a href={this.props.url}>Login using google</a>
      </div>
    )
  }
}

export default userLogin
