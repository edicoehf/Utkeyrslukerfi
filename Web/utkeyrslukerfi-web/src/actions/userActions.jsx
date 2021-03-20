import { GET_USER } from '../constants'
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

