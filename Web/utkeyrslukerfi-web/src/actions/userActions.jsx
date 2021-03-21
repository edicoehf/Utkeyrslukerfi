import { GET_USER, UPDATE_USER } from '../constants'
import userService from '../services/userService'

export const getUser = (token, email) => async (dispatch) => {
  try {
    const user = await userService.getUser(token, email)
    dispatch(getUserSuccess(user))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getUserSuccess = (user) => ({
  type: GET_USER,
  payload: user
})

export const updatePassword = (token, id, user) => async (dispatch) => {
  try {
    await userService.updatePassword(token, id, user)
    dispatch(updateUserSuccess({id, ...user}))
  } catch (err) {
    console.log('Bad request, please try again later.')
  }
}

const updateUserSuccess = (user) => ({
  type: UPDATE_USER,
  payload: user
})
