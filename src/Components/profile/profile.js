import React, {Fragment} from 'react'

export default function Profile (props) {
  console.log('PROFILE PROPS ', props)
  return (
    <Fragment>
      <h3>Name: {props.user.name}</h3>
      <h3>Email id: {props.user.email}</h3>
    </Fragment>
  )
}
