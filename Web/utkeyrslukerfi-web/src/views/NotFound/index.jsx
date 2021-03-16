import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/notfound.css'

const NotFound = () => {
  return (
    <div className="notfound">
      <h1>Error 404</h1>
      <h2>Page not found</h2>
      <NavLink
        exact
        to='/home'
        className='navigation-link'
      >Go back home
      </NavLink>
    </div>
  );
}

export default NotFound
