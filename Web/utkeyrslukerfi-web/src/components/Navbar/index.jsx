import React from 'react'
import LogoutButton from '../LogoutButton'
import NavLinks from '../NavLinks'

const Navbar = () => (
  <nav className='navbar navbar-expand-lg'>
    <NavLinks />
    <LogoutButton />
  </nav>
)

export default Navbar
