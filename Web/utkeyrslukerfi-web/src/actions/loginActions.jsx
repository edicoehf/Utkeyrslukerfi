import { SET_LOGIN, GET_LOGIN, CHANGE_PASSWORD, CLEAR_LOGIN } from '../constants'
import loginService from '../services/loginService'
import InvalidUserLogin from '../errors/InvalidUserLogin'
import FailedToConnectToServer from '../errors/FailedToConnectToServer'
import UnauthorizedUserLogin from '../errors/UnauthorizedUserLogin'
import NotFound from '../errors/NotFound'

export const setLogin = (email, password) => async (dispatch) => {
  const body = await loginService.login({ email, password })

  if (body?.errors) { return new InvalidUserLogin(body.errors) }
  if (body?.title === 'Unauthorized') { return new UnauthorizedUserLogin({ Login: 'The email and password do not match' }) }
  if (body?.token) {
    localStorage.setItem('token', JSON.stringify(body.token))

    dispatch(setLoginSuccess(body))
  } else {
    return new FailedToConnectToServer({ Server: 'Could not reach the login servers' })
  }
}

const setLoginSuccess = (body) => ({
  type: SET_LOGIN,
  payload: body
})

export const getLogin = () => async (dispatch) => {
  try {
    const token = await JSON.parse(localStorage.getItem('token'))
    dispatch(getLoginSuccess(token))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getLoginSuccess = (token) => ({
  type: GET_LOGIN,
  payload: token
})

export const updatePassword = (token, password) => async (dispatch) => {
  try {
    const res = await loginService.updatePassword(token, { password, changePassword: false })

    if (res?.status === 401) { return new UnauthorizedUserLogin('Not authorized.') }
    if (res?.status === 404) { return new NotFound('User was not found.') }
    dispatch(updatePassordSuccess(false))
  } catch (err) {
    return new FailedToConnectToServer('Could not connect to server.')
  }
}

const updatePassordSuccess = (changePassword) => ({
  type: CHANGE_PASSWORD,
  payload: changePassword
})

export const logout = (token) => async (dispatch) => {
  try {
    await loginService.logout(token)
    localStorage.removeItem('token')
    dispatch(logoutSuccess())
  } catch (err) {
    console.log(err)
  }
}

const logoutSuccess = () => ({
  type: CLEAR_LOGIN,
  payload: { changePassword: false, token: '' }
})
