import { SET_LOGIN, GET_LOGIN, CLEAR_LOGIN } from '../constants'
import loginService from '../services/loginService'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const setLogin = (name) => async (dispatch) => {
  try {
    const body = await loginService.login({ name })
    if (body?.token) {
      await AsyncStorage.setItem('token', JSON.stringify(body.token))
      dispatch(setLoginSuccess(body))
    }
  } catch (err) {
    console.log(err)
  }
}

export const getLogin = () => async (dispatch) => {
  try {
    const token = JSON.parse(await AsyncStorage.getItem('token'))
    dispatch(getLoginSuccess(token))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getLoginSuccess = (token) => ({
  type: GET_LOGIN,
  payload: token
})

const setLoginSuccess = (body) => ({
  type: SET_LOGIN,
  payload: body
})

export const logout = (token) => async (dispatch) => {
  try {
    await loginService.logout(token)
    await AsyncStorage.removeItem('token')
    dispatch(logoutSuccess())
  } catch (err) {
    console.log(err)
  }
}

const logoutSuccess = () => ({
  type: CLEAR_LOGIN,
  payload: { changePassword: false, token: '' }
})
