import React from 'react'
import './userLogin.css'

function userLogin (props) {
  return (
    <div id='userLogin'>
      <p className='is-block is-size-3 has-text-centered is-uppercase'>{props.name}</p>
      <button className='is-block button is-light'>Sign In</button>
      <button className='is-block button is-light'>Sign Up</button>
    </div>
  )
}

export default userLogin
