import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/notfound.css'

const NotFound = () => {
  return (
    <div className='notfound'>
      <h1>404 Villa</h1>
      <h2>Síða fannst ekki</h2>
      <NavLink
        exact
        to='/'
        className='navigation-link'
      >Fara aftur á forsíðu
      </NavLink>
    </div>
  )
}

export default NotFound
