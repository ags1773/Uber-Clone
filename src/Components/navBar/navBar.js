import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const imgStyle = {
  borderRadius: '50%'
}
class Navbar extends Component {
  componentDidMount () {
    const $navbarBurger = document.querySelector('.navbar-burger')
    if ($navbarBurger) {
      $navbarBurger.addEventListener('click', () => {
        const target = $navbarBurger.dataset.target
        const $target = document.getElementById(target)
        $navbarBurger.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    }
  }

  isEmpty (obj) {
    if (obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    }
    return true
  }

  render () {
    let displayUserNav = !this.isEmpty(this.props.user)
    return (
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='/'>
            <img src='https://res.cloudinary.com/dwecmtn7q/image/upload/v1539774801/uber_logo.jpg' />
          </a>
          <a href='#' role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbar'>
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </a>
        </div>
        <div id='navbar' className='navbar-menu'>
          {displayUserNav ? <div className='navbar-end'>
            <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link'>
                <img style={imgStyle} src={this.props.user.picture} />
              </a>
              <div className='navbar-dropdown is-right'>
                <Link className='navbar-item' to='/profile'>
                  Profile
                </Link>
                <a className='navbar-item'>
                  Past Rides
                </a>
                <hr className='navbar-divider' />
                <a className='navbar-item' href='/api/user/logout'>
                  Logout
                </a>
              </div>
            </div>
          </div> : null}
        </div>
      </nav>
    )
  }
}

export default Navbar
