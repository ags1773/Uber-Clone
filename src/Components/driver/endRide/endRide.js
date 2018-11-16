import React from 'react'
import './endRide.css'

export default function EndRide (props) {
  setPaymentDataInUserDb(props)
  props.socket.emit('relayEndRide', props.price)
  return (
    <div class='hero is-medium is-light is-bold' id='endRide'>
      <div class='hero-head'>
        <p class='is-size-3 has-text-centered has-text-dark is-uppercase'>
              End Ride!
        </p>
      </div>
      <div class='hero-body'>
        <div class='content'>
          <p class='is-size-5 has-text-centered has-text-dark'>
              Collect <strong>Rs.{props.price}</strong> from the rider!
          </p>
        </div>
      </div>
      <div class='hero-foot'>
        <div class='container'>
          <button class='button is-dark' onClick={paymentRecieved.bind(null, props)}>OK</button>
        </div>
      </div>
    </div>
  )
}

function setPaymentDataInUserDb (props) {
  props.socket.emit('setPaymentDataInUserDb', props.price)
}
function paymentRecieved (props) {
  props.resetRideStatus()
  props.socket.emit('relayPaymentSuccess')
  props.socket.emit('setPaymentDataInUserDb', 0)
}
