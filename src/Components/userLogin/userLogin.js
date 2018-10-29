import React from 'react'
import './userLogin.css'

function userLogin (props) {
  console.log('URL', props.url)
  return (
    <div id='userLogin'>
      <p className='is-block is-size-3 has-text-centered is-uppercase'>{props.name}</p>
      <a
        href={props.url}>Login using google</a>
    </div>
  )
}

export default userLogin
