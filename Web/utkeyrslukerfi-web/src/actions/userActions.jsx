import { GET_USER } from '../constants'
import userService from '../services/userService'

export const getUser = (email) => async (dispatch) => {
  try {
    const user = await userService.getUser(email)
    console.log("User in action", user)
    dispatch(getUserSuccess(user))
  } catch (err) {
    console.log(err)
    console.log('Bad request, please try loading again.')
  }
}

const getUserSuccess = (user) => ({
  type: GET_USER,
  payload: user
})

