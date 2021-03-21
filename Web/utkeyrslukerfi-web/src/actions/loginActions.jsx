import { SET_EMAIL, GET_EMAIL, SET_TOKEN, GET_TOKEN } from '../constants'
import loginService from '../services/loginService'
import InvalidUserLogin from '../errors/InvalidUserLogin'
import FailedToConnectToServer from '../errors/FailedToConnectToServer'
import UnauthorizedUserLogin from '../errors/UnauthorizedUserLogin'

export const setLogin = (email, password) => async (dispatch) => {
  const token = await loginService.login({ email, password })

  if (token?.errors) { return new InvalidUserLogin(token.errors) }
  if (token?.title === 'Unauthorized') { return new UnauthorizedUserLogin({ Login: 'The email and password do not match' }) }
  if (token?.token) {
    localStorage.setItem('email', JSON.stringify(email))
    localStorage.setItem('token', JSON.stringify(token.token))

    dispatch(setEmailSuccess(email))
    dispatch(setTokenSuccess(token.token))
  } else {
    return new FailedToConnectToServer({ Server: 'Could not reach the login servers' })
  }
}

const setEmailSuccess = (email) => ({
  type: SET_EMAIL,
  payload: email
})

const setTokenSuccess = (token) => ({
  type: SET_TOKEN,
  payload: token
})

export const getLogin = () => async (dispatch) => {
  try {
    const email = await JSON.parse(localStorage.getItem('email'))
    const token = await JSON.parse(localStorage.getItem('token'))
    dispatch(getEmailSuccess(email))
    dispatch(getTokenSuccess(token))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getEmailSuccess = (email) => ({
  type: GET_EMAIL,
  payload: email
})

const getTokenSuccess = (token) => ({
  type: GET_TOKEN,
  payload: token
})
