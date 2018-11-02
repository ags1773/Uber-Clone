import React, {Component} from 'react'
import './findRide.css'

class FindRide extends Component {
  render () {
    return (
      <div className='container' id='findRide' >
        <p className='is-size-3 has-text-centered has-text-light is-inline-block'>Connecting to nearby drivers..</p>
        <div className='lds-ripple'>
          <div />
          <div />
        </div>
      </div>
    )
  }
}

export default FindRide
