import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/home.css'

const Home = () => {
  return (
    <div className='homepage'>
      <div>
        <NavLink className='home-btn' to='/users'><span>Notendur</span></NavLink>
        <NavLink className='home-btn' to='/deliveries'><span>Sendingar</span></NavLink>
      </div>
    </div>
  )
}

export default Home
