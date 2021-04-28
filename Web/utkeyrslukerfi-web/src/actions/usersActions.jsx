import { GET_USERS, GET_DRIVERS } from '../constants'
import userService from '../services/userService'

export const getUsers = (token) => async (dispatch) => {
  try {
    const users = await userService.getUsers(token)
    dispatch(getUsersSuccess(users))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}


const getUsersSuccess = (users) => ({
  type: GET_USERS,
  payload: users
})


export const getDrivers = (token) => async (dispatch) => {
  try {
    const drivers = await userService.getDrivers(token)
    dispatch(getDriversSuccess(drivers))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getDriversSuccess = (drivers) => ({
  type: GET_DRIVERS,
  payload: drivers
})
