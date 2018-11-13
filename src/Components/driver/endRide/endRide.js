import React from 'react'

export default function EndRide (props) {
  return (
    <div class='hero is-light is-bold'>
      <div class='hero-head'>
        <p class='has-text-centered'>
              End Ride!
        </p>
      </div>
      <div class='hero-body'>
        <div class='content'>
          <p class='has-text-centered'>
              User has to pay Rs.{props.price}!
          </p>
        </div>
      </div>
      <div class='hero-foot'>
        <div class='control'>
          <button class='button is-dark' onClick={props.resetRideStatus}>Ok</button>
        </div>
      </div>
    </div>
  )
}
