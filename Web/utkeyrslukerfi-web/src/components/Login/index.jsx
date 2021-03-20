import React, { useState } from 'react'
import '../../styles/login.css'
import { connect } from 'react-redux'
import { setLogin } from '../../actions/loginActions'

const Login = ({ setLogin }) => {
  const [email, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLogin(email, password)
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

export default connect(null, { setLogin })(Login)
