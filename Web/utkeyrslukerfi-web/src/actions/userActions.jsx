import { GET_LOGGED_IN_USER, UPDATE_LOGGED_IN_USER, GET_VIEWING_USER, SET_VIEWING_USER, UPDATE_VIEWING_USER, CREATE_USER } from '../constants'
import userService from '../services/userService'
import EmailAlreadyExists from '../errors/EmailAlreadyExists'
import UnauthorizedUserLogin from '../errors/UnauthorizedUserLogin'
import FailedToConnectToServer from '../errors/FailedToConnectToServer'
import NotFound from '../errors/NotFound'

// --------------- User logged in ---------------
export const getLoggedInUser = (token, email) => async (dispatch) => {
  try {
    const user = await userService.getUserByEmail(token, email)
    dispatch(getLoggedInUserSuccess(user))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getLoggedInUserSuccess = (user) => ({
  type: GET_LOGGED_IN_USER,
  payload: user
})

export const updatePassword = (token, id, user) => async (dispatch) => {
  try {
    await userService.updateUser(token, id, user)
    dispatch(updateLoggedInUserSuccess({ id, ...user }))
  } catch (err) {
    console.log('Bad request, please try again later.')
  }
}

const updateLoggedInUserSuccess = (user) => ({
  type: UPDATE_LOGGED_IN_USER,
  payload: user
})

// --------------- User being viewed ---------------
export const setViewingUser = (user) => ({
  type: SET_VIEWING_USER,
  payload: user
})

export const getViewingUser = (token, id) => async (dispatch) => {
  try {
    console.log(token)
    const user = await userService.getUser(token, id)
    dispatch(getViewingUserSuccess(user))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getViewingUserSuccess = (user) => ({
  type: GET_VIEWING_USER,
  payload: user
})

export const updateUser = (token, id, user) => async (dispatch) => {
  try {
    const res = await userService.updateUser(token, id, user)

    if (res?.status === 401) { return new UnauthorizedUserLogin('Not authorized.') }
    if (res?.status === 404) { return new NotFound('User was not found.') }
    dispatch(updateViewingUserSuccess({ id, ...user }))
  } catch (err) {
    return new FailedToConnectToServer('Could not connect to server.')
  }
}

const updateViewingUserSuccess = (user) => ({
  type: UPDATE_VIEWING_USER,
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
