import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'

const NavLinks = () => (
  <div className='collapse navbar-collapse' id='navbar-nav'>
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <NavLink exact to='/' className='nav-link'>
          <AiFillHome size="3em" color="white" />
        </NavLink>
      </li>
    </ul>
  </div>
)

export default NavLinks
