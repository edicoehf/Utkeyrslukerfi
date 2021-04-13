import { SET_ERROR, RESET_ERROR } from '../constants'

export const setError = (body) => ({
  type: SET_ERROR,
  payload: body
})

export const resetError = () => ({
  type: RESET_ERROR,
  payload: {}
})
