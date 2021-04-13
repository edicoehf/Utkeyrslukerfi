import { SET_ERROR, RESET_ERROR } from '../constants'

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ERROR: return action.payload
    case RESET_ERROR: return {}
    default: return state
  }
}

export default errorReducer
