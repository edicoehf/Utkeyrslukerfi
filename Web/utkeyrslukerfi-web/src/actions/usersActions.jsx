import { GET_USERS } from '../constants'
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

