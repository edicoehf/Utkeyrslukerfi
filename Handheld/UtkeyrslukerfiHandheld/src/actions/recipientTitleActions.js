import { SET_RECIPIENT_TITLE, GET_RECIPIENT_TITLE } from '../constants'

export const getRecipient = () => ({
  type: GET_RECIPIENT_TITLE
})

export const setRecipient = (name) => ({
  type: SET_RECIPIENT_TITLE,
  payload: name
})
