import React, {Component, Fragment} from 'react'
import NavBar from './navBar/navBar'
import Main from './main'

const script = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`
function loadScript (src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = src
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', e => reject(e))
    document.body.appendChild(script)
  })
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      scriptLoaded: false
    }
  }
  componentWillMount () {
    loadScript(script)
      .then(() => this.setState({scriptLoaded: true}))
      .catch(e => console.log(e))
  }

  render () {
    if (this.state.scriptLoaded) {
      return (
        <Fragment>
          <NavBar />
          <Main />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <h2>Could not load google script</h2>
        </Fragment>
      )
    }
  }
}

export default App
