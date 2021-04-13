import { SET_ERROR, RESET_ERROR } from '../constants'

const messageReducer = (state = { error: {}, success: {} }, action) => {
  switch (action.type) {
    case SET_ERROR: return { error: action.payload, success: {} }
    case RESET_ERROR: return {}
    default: return state
  }
}

export default messageReducer
