import { GET_DRIVERS } from '../constants'
import driverService from '../services/driversService'

export const getDrivers = () => async (dispatch) => {
  try {
    const drivers = await driverService.getDrivers()
    dispatch(getDriversSuccess(drivers))
  } catch (err) {
    // TODO display this error message to the user
    console.log('Bad request, please try loading again.')
  }
}

const getDriversSuccess = (drivers) => ({
  type: GET_DRIVERS,
  payload: drivers
})
