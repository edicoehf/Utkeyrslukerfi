import React, { useState } from 'react'
import '../../styles/login.css'
import { connect } from 'react-redux'
import { setLogin } from '../../actions/loginActions'

const Login = ({ setLogin }) => {
  const [email, setUserName] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = await setLogin(email, password)
    if (err) {
      if (err?.errors) {
        let msg = ''
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.errors)) {
          msg += `${value}\n`
        }
        const element = document.getElementById('err-msg')
        element.classList.remove('d-none')
        setErrorMessage(msg)
      } else {
        setErrorMessage('Could not reach the login servers')
      }
    }
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
        <div id='err-msg' className='error-message alert alert-danger d-none'>{errorMessage}</div>
      </form>
    </div>
  )
}

export default connect(null, { setLogin })(Login)
