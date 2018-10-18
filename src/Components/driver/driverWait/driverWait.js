import React from 'react'
import './driverWait.css'

function DriverWait () {
  return (
    <div className='container' id='driverWait' >
      <p className='is-size-3 has-text-centered has-text-light is-inline-block'>Waiting for ride</p>
      <div className='lds-ripple'>
        <div />
        <div />
      </div>
    </div>
  )
}

export default DriverWait
