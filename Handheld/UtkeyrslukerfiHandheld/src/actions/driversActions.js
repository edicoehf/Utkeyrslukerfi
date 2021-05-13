import { ToastAndroid } from 'react-native'
import { GET_DRIVERS } from '../constants'
import driverService from '../services/driversService'

export const getDrivers = () => async (dispatch) => {
  try {
    const drivers = await driverService.getDrivers()
    dispatch(getDriversSuccess(drivers))
  } catch (err) {
    ToastAndroid.showWithGravity('Ekki tókst að ná í bílstjórana.', ToastAndroid.LONG, ToastAndroid.TOP)
  }
}

const getDriversSuccess = (drivers) => ({
  type: GET_DRIVERS,
  payload: drivers
})
