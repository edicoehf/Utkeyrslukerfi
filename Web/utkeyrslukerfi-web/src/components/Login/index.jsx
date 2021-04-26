import React, { useState } from 'react'
import '../../styles/login.css'
import { setLogin } from '../../actions/loginActions'
import { useDispatch } from 'react-redux'

// Login - only diplayed when user is not logged in
const Login = () => {
  const [email, setUserName] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(setLogin(email, password))
  }

  return (
    <div className='login-wrapper'>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Netfang:</p>
          <input type='text' onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Lykilorð: </p>
          <input type='password' onChange={e => setPassword(e.target.value)} />
        </label>
        <div className='btn-wrapper'>
          <button className='btn btn-secondary' type='submit'>Innskrá</button>
        </div>
      </form>
    </div>
  )
}

export default Login
