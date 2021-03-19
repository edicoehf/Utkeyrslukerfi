import React, { useState } from 'react'
import '../../styles/login.css'
import PropTypes from 'prop-types'

import loginUser from '../../services/accountService'
import { connect } from 'react-redux'
import { getUser } from '../../actions/userActions'

const Login = ({ setToken, getUser }) => {
  const [email, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    const token = await loginUser({
      Email: email,
      Password: password
    })
    setToken(token)
    getUser(email)
  }

  return (
    <div className='login-wrapper'>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type='text' onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type='password' onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default connect(null, { getUser })(Login)
