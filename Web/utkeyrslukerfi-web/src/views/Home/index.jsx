import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/home.css'

const Home = () => {
  return (
    <div class='homepage'>
      <NavLink class="left btn-lg btn btn-primary" to='/users'>Users</NavLink>
      <NavLink class="right btn-lg btn btn-primary" to='/deliveries'>Deliveries</NavLink>
    </div>
  )
}

export default Home
