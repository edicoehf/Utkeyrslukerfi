import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinks = () => (
  <div className='collapse navbar-collapse' id='navbar-nav'>
    <div>
      <NavLink exact to='/' className='nav-link'>
        <img src='../../../logo192.png' className='navbar-brand' width='50' height='50' />
      </NavLink>
    </div>
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <NavLink exact to='/' className='nav-link'>
          Forsíða
        </NavLink>
      </li>
    </ul>
  </div>
)

export default NavLinks
