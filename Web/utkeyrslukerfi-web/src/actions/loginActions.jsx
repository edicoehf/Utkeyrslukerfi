import { SET_LOGIN, GET_LOGIN, CHANGE_PASSWORD, CLEAR_LOGIN } from '../constants'
import loginService from '../services/loginService'
import InvalidUserLogin from '../errors/InvalidUserLogin'
import FailedToConnectToServer from '../errors/FailedToConnectToServer'
import UnauthorizedUserLogin from '../errors/UnauthorizedUserLogin'
import NotFound from '../errors/NotFound'
import { setError, resetError } from './errorActions'

export const setLogin = (email, password) => async (dispatch) => {
  try {
    const body = await loginService.login({ email, password })

    if (body?.errors) { dispatch(setError(new InvalidUserLogin(body.errors))) }
    if (body?.title === 'Unauthorized') { dispatch(setError(new UnauthorizedUserLogin({ Login: 'Netfang og lykilorð stemma ekki.' }))) }
    if (body?.token) {
      localStorage.setItem('token', JSON.stringify(body.token))

      dispatch(setLoginSuccess(body))
      dispatch(resetError()) // Clear errors
    }
  } catch (err) {
    dispatch(setError(new FailedToConnectToServer({ Server: 'Ekki náðist samband við netþjón.' })))
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

    if (res?.status === 401) { dispatch(setError(new UnauthorizedUserLogin('Not authorized.'))) }
    if (res?.status === 404) { dispatch(setError(NotFound('User was not found.'))) }
    if (res?.status === 204) {
      dispatch(updatePassordSuccess(false))
      dispatch(resetError()) // Clear errors
    }
  } catch (err) {
    dispatch(setError(FailedToConnectToServer({ Server: 'Ekki náðist samband við netþjón.' })))
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
