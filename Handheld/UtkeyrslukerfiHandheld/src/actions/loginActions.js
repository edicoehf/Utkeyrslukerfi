import { SET_LOGIN, GET_LOGIN, CLEAR_LOGIN } from '../constants'
import loginService from '../services/loginService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'

export const setLogin = (driver) => async (dispatch) => {
  try {
    const body = await loginService.login({ name: driver.name })
    if (body?.token) {
      await AsyncStorage.setItem('token', JSON.stringify(body.token))
      await AsyncStorage.setItem('driver', JSON.stringify(driver.id))
      dispatch(setLoginSuccess({ ...body, driver: driver.id }))
    }
  } catch (err) {
    ToastAndroid.showWithGravity('Ekki tókst að skrá þig inn.', ToastAndroid.LONG, ToastAndroid.TOP)
  }
}

export const getLogin = () => async (dispatch) => {
  try {
    const token = JSON.parse(await AsyncStorage.getItem('token'))
    const driver = JSON.parse(await AsyncStorage.getItem('driver'))
    dispatch(getLoginSuccess({ token, driver }))
  } catch (err) {
    ToastAndroid.showWithGravity('Ekki tókst að skrá þig inn.', ToastAndroid.LONG, ToastAndroid.TOP)
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
    ToastAndroid.showWithGravity('Ekki náðist samband við netþjón.', ToastAndroid.LONG, ToastAndroid.TOP)
  }
}

const logoutSuccess = () => ({
  type: CLEAR_LOGIN,
  payload: { token: '', driver: '' }
})
