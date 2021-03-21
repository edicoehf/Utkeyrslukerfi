import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinks = () => (
  <div className='collapse navbar-collapse' id='navbar-nav'>
    <div>
    <a className='navbar-brand'>
      <NavLink exact to='/' className='nav-link'>
        <img src={'../../../logo192.png'} className='navbar-brand' width='50' height='50'></img>
      </NavLink>
    </a>
    </div>
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <NavLink exact to='/' className='nav-link'>
          Home
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink exact to='/deliveries' className='nav-link'>
          Deliveries
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink exact to='/users' className='nav-link'>
          Users
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink exact to='/about' className='nav-link'>
          About
        </NavLink>
      </li>
    </ul>
  </div>
)

export default NavLinks