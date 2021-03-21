import { GET_LOGGED_IN_USER, UPDATE_LOGGED_IN_USER, GET_VIEWING_USER, SET_VIEWING_USER, UPDATE_VIEWING_USER, CREATE_USER } from '../constants'
import userService from '../services/userService'

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
    await userService.updateUser(token, id, user)
    dispatch(updateViewingUserSuccess({ id, ...user }))
  } catch (err) {
    console.log('Bad request, please try again later.')
  }
}

const updateViewingUserSuccess = (user) => ({
  type: UPDATE_VIEWING_USER,
  payload: user
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
