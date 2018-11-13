import React from 'react'

export default function FinishRide (props) {
  return (
    <div class='hero'>
      <div class='hero-body'>
        <div class='container'>
          <h1 class='title'>
              Thanks for riding with us!
          </h1>
          <h2 class='subtitle'>
              Please pay Rs.{props.price} to the driver!
          </h2>
        </div>
      </div>
    </div>
  )
}
