import { GET_USERS, CREATE_USER } from '../constants'
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

export const createUser = (token, user) => async (dispatch) => {
  try {
    const body = await userService.createUser(token, user)
    dispatch(createUserSuccess({ id: body.id, ...user }))
  } catch (err) {
    console.log('Bad request, please try again later.')
  }
}

const createUserSuccess = (user) => ({
  type: CREATE_USER,
  payload: user
})
