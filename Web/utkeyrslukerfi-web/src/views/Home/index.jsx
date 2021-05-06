import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../../styles/home.css'

const Home = () => {
  const role = useSelector(({ login }) => login.role)
  return (
    <div className='homepage'>
      <div>
        {role === 1
          ? <NavLink className='home-btn' to='/users'><span>Notendur</span></NavLink>
          : <NavLink className='disabled-btn' to=''><span>Notendur</span></NavLink>}
        <NavLink className='home-btn' to='/deliveries'><span>Sendingar</span></NavLink>
      </div>
    </div>
  )
}

export default Home
