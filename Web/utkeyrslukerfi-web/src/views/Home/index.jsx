import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='homepage'>
      <NavLink to='/users'>Users</NavLink>
      <NavLink to='/deliveries'>Deliveries</NavLink>
    </div>
  )
}

export default Home
