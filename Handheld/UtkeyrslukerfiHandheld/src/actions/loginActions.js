import { SET_LOGIN, GET_LOGIN, CLEAR_LOGIN } from '../constants'
import loginService from '../services/loginService'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const setLogin = (driver) => async (dispatch) => {
  try {
    const body = await loginService.login({ name: driver.name })
    if (body?.token) {
      await AsyncStorage.setItem('token', JSON.stringify(body.token))
      await AsyncStorage.setItem('driver', JSON.stringify(driver.id))
      dispatch(setLoginSuccess({ ...body, driver: driver.id }))
    }
  } catch (err) {
    console.log(err)
  }
}

export const getLogin = () => async (dispatch) => {
  try {
    const token = JSON.parse(await AsyncStorage.getItem('token'))
    const driver = JSON.parse(await AsyncStorage.getItem('driver'))
    dispatch(getLoginSuccess({ token, driver }))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getLoginSuccess = (login) => ({
  type: GET_LOGIN,
  payload: login
})

const setLoginSuccess = (login) => ({
  type: SET_LOGIN,
  payload: login
})

export const logout = (token) => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('driver')
    await loginService.logout(token)
    dispatch(logoutSuccess())
  } catch (err) {
    console.log(err)
  }
}

const logoutSuccess = () => ({
  type: CLEAR_LOGIN,
  payload: { token: '', driver: '' }
})
