import { GET_VIEWING_USER, SET_VIEWING_USER, UPDATE_USER, CREATE_USER } from '../constants'
import userService from '../services/userService'
import toastr from 'toastr'

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

// --------------- User being created/updated ---------------
export const updateUser = (token, id, user) => async (dispatch) => {
  try {
    const res = await userService.updateUser(token, id, user)

    if (res?.status === 401) { toastr.error('Notandi er ekki innskráður.') }
    if (res?.status === 404) { toastr.error('Notandi fannst ekki.') }
    if (res?.status === 400) { toastr.error('Slæm beiðni.') }
    if (res?.status === 204) {
      dispatch(updateUserSuccess({ id, ...user }))
      toastr.success('Notandi hefur verið uppfærður!')
    }
  } catch (err) {
    toastr.error('Ekki náðist samband við netþjón.')
  }
}

const updateUserSuccess = (user) => ({
  type: UPDATE_USER,
  payload: user
})

export const createUser = (token, user) => async (dispatch) => {
  try {
    const body = await userService.createUser(token, user)

    if (body?.status === 400) { toastr.error('Netfang er nú þegar í notkun.') }
    if (body?.status === 401) { toastr.error('Notandi er ekki innskráður.') }
    if (body?.id) {
      toastr.success('Nýjum notanda hefur verið bætt við!')
      dispatch(createUserSuccess({ id: body.id, ...user }))
    }
  } catch (err) {
    toastr.error('Ekki náðist samband við netþjón.')
  }
}

const createUserSuccess = (user) => ({
  type: CREATE_USER,
  payload: user
})
