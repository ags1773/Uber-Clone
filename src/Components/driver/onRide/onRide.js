import React, {Fragment} from 'react'
import Map from '../../map/map'

export default function OnRide (props) {
  return (
    <Fragment>
      <div class='container' id='onRide'>
        <div class='content'>
          <p class='is-size-3 has-text-centered has-text-dark is-uppercase'>Rider drop!</p>
          <p><strong>Destination Address: </strong>{props.mapRenderData.destinationAddress}</p>
        </div>
        <div class='control'>
          <button class='button is-dark' onClick={props.endRide}>End Ride</button>
        </div>
      </div>
      <Map
        userPos={props.mapRenderData.userPos}
        origin={props.mapRenderData.origin}
        destination={props.mapRenderData.destination}
      />
    </Fragment>
  )
}
