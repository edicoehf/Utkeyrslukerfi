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
    <button onClick={() => handleLogout()}>
      <AiOutlineLogout />
    </button>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.login.token
  }
}

export default connect(mapStateToProps, { logout })(LogoutButton)
