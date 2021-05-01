import { GET_VEHICLES } from '../constants'
import vehicleService from '../services/vehicleService'
import toastr from 'toastr'

export const getVehicles = (token) => async (dispatch) => {
  try {
    const vehicles = await vehicleService.getVehicles(token)
    dispatch(getVehiclesSuccess(vehicles))
  } catch (err) {
    toastr.error('Bad request, could not get list of vehicles.')
  }
}

const getVehiclesSuccess = (vehicles) => ({
  type: GET_VEHICLES,
  payload: vehicles
})
