import { useState } from 'react'
import InvalidUserLogin from '../errors/InvalidUserLogin'
import FailedToConnectToServer from '../errors/FailedToConnectToServer'
import UnauthorizedUserLogin from '../errors/UnauthorizedUserLogin'

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    return tokenString
  }

  const [token, setToken] = useState(getToken())

  const saveToken = userToken => {
    if (userToken?.errors) { throw new InvalidUserLogin(userToken.errors) }
    if (userToken?.title === 'Unauthorized') { throw new UnauthorizedUserLogin({ Login: 'The email and password do not match' }) }
    if (userToken?.token) { localStorage.setItem('token', userToken.token); setToken(userToken.token); return }
    throw new FailedToConnectToServer({ Server: 'Could not reach the login servers' })
  }

  return {
    setToken: saveToken,
    token
  }
}

export default useToken
