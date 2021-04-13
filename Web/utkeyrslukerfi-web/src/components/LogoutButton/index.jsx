import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/loginActions'

const LogoutButton = () => {
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()
  const handleLogout = () => {
    if (token) {
      dispatch(logout(token))
    }
  }

  return (
    <button className='navigation-link logout-button' onClick={() => handleLogout()}>
      <AiOutlineLogout size='1.5em' color='white' />
    </button>
  )
}

export default LogoutButton
