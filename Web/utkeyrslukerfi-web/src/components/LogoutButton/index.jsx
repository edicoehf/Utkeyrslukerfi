import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { connect } from 'react-redux'
import { logout } from '../../actions/loginActions'

const LogoutButton = ({ token, logout }) => {
  const handleLogout = () => {
    if (token) {
      logout(token)
    }
  }

  return (
    <button className='navigation-link logout-button' onClick={() => handleLogout()}>
      <AiOutlineLogout size='1.5em' color='white' />
    </button>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.login.token
  }
}

export default connect(mapStateToProps, { logout })(LogoutButton)
