import React from 'react'
import './userLogin.css'

class userLogin extends React.Component {
  onLogin () {
    fetch(this.props.url, {
      mode: 'no-cors'
    })
      .then(response => {
        console.log('RESPONSE AFTER AUTH ', response)
      })
      .catch(err => {
        console.log('ERROR ', err)
      })
  }
  render () {
    return (
      <div id='userLogin'>
        <p className='is-block is-size-3 has-text-centered is-uppercase'>{this.props.name}</p>
        <a href={this.props.url}>Login using google</a>
        {/* <button
          className='is-block button is-light'
          onClick={this.onLogin.bind(this)}>Login using google</button> */}
      </div>
    )
  }
}

export default userLogin
