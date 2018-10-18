import React, {Component} from 'react'

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

  render () {
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
          <div className='navbar-start'>
            <a className='navbar-item'>
              link
            </a>
          </div>
          <div className='navbar-end'>
            <p className='navbar-item'>
              User | Signed in as: ---
            </p>
            {/* <div className='navbar-item'>
              <div className='buttons'>
                <a className='button is-dark'>
                  <strong>Sign up</strong>
                </a>
                <a className='button is-dark'>
                  Log in
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
