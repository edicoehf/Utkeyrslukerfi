import { GET_USER, UPDATE_USER } from '../constants'
import userService from '../services/userService'

export const getUser = (email) => async (dispatch) => {
  try {
    const user = await userService.getUser(email)
    dispatch(getUserSuccess(user))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getUserSuccess = (user) => ({
  type: GET_USER,
  payload: user
})


export const updatePassword = (id, user) => async (dispatch) => {
  try {
    await userService.updatePassword(id, user)
    dispatch(updateUserSuccess({id, ...user}))
  } catch (err) {
    console.log(err)
    console.log('Bad request, please try again later.')
  }
}

const updateUserSuccess = (user) => ({
  type: UPDATE_USER,
  payload: user
})
