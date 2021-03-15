import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar () {
  return (
    <nav className='navbar'>
      <NavLink
        exact
        to='/home'
        className='navigation-link'
      >Home
      </NavLink>
    </nav>
  )
}

export default Navbar
