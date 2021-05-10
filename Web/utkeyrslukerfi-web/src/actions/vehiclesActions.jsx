import {
  GET_VEHICLES,
  SET_VIEWING_VEHICLE,
  GET_VIEWING_VEHICLE,
  UPDATE_VEHICLE
} from '../constants'
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

export const setViewingVehicle = (vehicle) => ({
  type: SET_VIEWING_VEHICLE,
  payload: vehicle
})

export const getViewingVehicle = (token, id) => async (dispatch) => {
  try {
    const vehicle = await vehicleService.getVehicle(token, id)
    dispatch(getViewingVehicleSuccess(vehicle))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getViewingVehicleSuccess = (vehicle) => ({
  type: GET_VIEWING_VEHICLE,
  payload: vehicle
})

// TODO: UPDATE_VEHICLE
export const updateVehicle = (token, id, vehicle) => async (dispatch) => {
  try {
    const res = await vehicleService.updateVehicle(token, id, vehicle)

    if (res?.status === 401) { toastr.error('Notandi er ekki innskráður.') }
    if (res?.status === 404) { toastr.error('Notandi fannst ekki.') }
    if (res?.status === 400) { toastr.error('Slæm beiðni.') }
    if (res?.status === 204) {
      dispatch(updateVehicleSuccess({ id, ...vehicle }))
      toastr.success('Notandi hefur verið uppfærður!')
    }
  } catch (err) {
    toastr.error('Ekki náðist samband við netþjón.')
  }
}

const updateVehicleSuccess = (vehicle) => ({
  type: UPDATE_VEHICLE,
  payload: vehicle
})