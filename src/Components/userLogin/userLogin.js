import React from 'react'
import './userLogin.css'

function userLogin (props) {
  return (
    <div id='userLogin'>
      <p className='is-block is-size-3 has-text-centered is-uppercase'>{props.name}</p>
      <button
        className='is-block button is-light'
        onClick={props.onLogin}>Login using google</button>
    </div>
  )
}

export default userLogin
