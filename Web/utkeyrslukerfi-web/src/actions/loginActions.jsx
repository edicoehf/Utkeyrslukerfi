import { SET_LOGIN, GET_LOGIN, CHANGE_PASSWORD, CLEAR_LOGIN } from '../constants'
import loginService from '../services/loginService'
import toastr from 'toastr'

export const setLogin = (email, password) => async (dispatch) => {
  try {
    const body = await loginService.login({ email, password })

    if (body?.errors) {
      for (const [key, value] of Object.entries(body.errors)) {
        toastr.error(value)
      }
    }
    if (body?.token) {
      localStorage.setItem('token', JSON.stringify(body.token))
      localStorage.setItem('role', JSON.stringify(body.role))
      dispatch(setLoginSuccess(body))
    }
  } catch (err) {
    toastr.error('Ekki náðist samband við netþjón.')
  }
}

const setLoginSuccess = (body) => (
  {
  type: SET_LOGIN,
  payload: body
})

export const getLogin = () => async (dispatch) => {
  try {
    const token = await JSON.parse(localStorage.getItem('token'))
    const role = await JSON.parse(localStorage.getItem('role'))
    dispatch(getLoginSuccess(token, role))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getLoginSuccess = (token, role) => ({
  type: GET_LOGIN,
  payload: token,
  role: role
})

export const updatePassword = (token, password) => async (dispatch) => {
  try {
    const res = await loginService.updatePassword(token, { password, changePassword: false })

    if (res?.status === 401) { toastr.error('Notandi er ekki innskráður.') }
    if (res?.status === 404) { toastr.error('Notandi fannst ekki.') }
    if (res?.status === 204) { dispatch(updatePassordSuccess(false)) }
  } catch (err) {
    toastr.error('Ekki náðist samband við netþjón.')
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
    localStorage.removeItem('role')
    dispatch(logoutSuccess())
  } catch (err) {
    console.log(err)
  }
}

const logoutSuccess = () => ({
  type: CLEAR_LOGIN,
  payload: { changePassword: false, token: '' }
})
