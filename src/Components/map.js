import React, {Component} from 'react'
import './map.css'

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userPos: this.props.userPos
    }
  }

  componentDidMount () {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: this.state.userPos,
      zoom: 15
    })
    let marker = new google.maps.Marker({
      position: this.state.userPos,
      map: map
    })
    this.setState({map, marker})
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.userPos === nextProps.userPos) return null
    return ({userPos: nextProps.userPos})
  }

  render () {
    return (
      <div id='map' />
    )
  }
}

export default Map
