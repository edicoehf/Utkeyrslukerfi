import { GET_USER, SET_USER, UPDATE_USER, CREATE_USER } from '../constants'
import userService from '../services/userService'
import EmailAlreadyExists from '../errors/EmailAlreadyExists'
import UnauthorizedUserLogin from '../errors/UnauthorizedUserLogin'
import FailedToConnectToServer from '../errors/FailedToConnectToServer'
import NotFound from '../errors/NotFound'

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
})

export const getUser = (token, id) => async (dispatch) => {
  try {
    const user = await userService.getUser(token, id)
    dispatch(getUserSuccess(user))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getUserSuccess = (user) => ({
  type: GET_USER,
  payload: user
})

export const updateUser = (token, id, user) => async (dispatch) => {
  try {
    const res = await userService.updateUser(token, id, user)

    if (res?.status === 401) { return new UnauthorizedUserLogin('Not authorized.') }
    if (res?.status === 404) { return new NotFound('User was not found.') }
    dispatch(updateUserSuccess({ id, ...user }))
  } catch (err) {
    return new FailedToConnectToServer('Could not connect to server.')
  }
}

const updateUserSuccess = (user) => ({
  type: UPDATE_USER,
  payload: user
})

export const createUser = (token, user) => async (dispatch) => {
  try {
    const body = await userService.createUser(token, user)

    if (body?.status === 400) { return new EmailAlreadyExists('Email already exists.') }
    if (body?.status === 401) { return new UnauthorizedUserLogin('Not authorized.') }
    dispatch(createUserSuccess({ id: body.id, ...user }))
  } catch (err) {
    return new FailedToConnectToServer('Could not connect to server.')
  }
}

const createUserSuccess = (user) => ({
  type: CREATE_USER,
  payload: user
})
