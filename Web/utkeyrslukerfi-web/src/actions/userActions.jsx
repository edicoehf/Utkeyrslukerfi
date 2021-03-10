import { GET_USERS } from '../constants'
import userService from '../services/userService'

export const getUsers = () => async (dispatch) => {
  try {
    const users = await userService.getUsers()
    dispatch(getUsersSuccess(users))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getUsersSuccess = (users) => ({
  type: GET_USERS,
  payload: users
})
