import { SET_RECIPIENT_TITLE, GET_RECIPIENT_TITLE } from '../constants'

export const setRecipient = (name) => async (dispatch) => {
  try {
    dispatch(setRecipientSuccess(name))
  } catch (err) {
    console.log(err)
  }
}

export const getRecipient = () => async (dispatch) => {
  try {
    dispatch(getRecipientSuccess())
  } catch (err) {
    console.log(err)
  }
}

const getRecipientSuccess = () => ({
  type: GET_RECIPIENT_TITLE
})

const setRecipientSuccess = (name) => ({
  type: SET_RECIPIENT_TITLE,
  payload: name
})