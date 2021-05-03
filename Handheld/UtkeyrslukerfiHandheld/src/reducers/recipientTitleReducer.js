import { SET_RECIPIENT_TITLE, GET_RECIPIENT_TITLE } from '../constants'

const recipientTitleReducer = (state = '', action) => {
  switch (action.type) {
    case SET_RECIPIENT_TITLE: return action.payload
    case GET_RECIPIENT_TITLE: return action.payload
    default: return state
  }
}

export default recipientTitleReducer
