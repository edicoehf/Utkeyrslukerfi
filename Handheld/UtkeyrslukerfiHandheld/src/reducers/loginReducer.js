import { SET_LOGIN, GET_LOGIN, CLEAR_LOGIN } from '../constants'

const loginReducer = (state = { token: '' }, action) => {
  switch (action.type) {
    case SET_LOGIN: return action.payload
    case GET_LOGIN: return { token: action.payload }
    case CLEAR_LOGIN: return action.payload
    default: return state
  }
}

export default loginReducer
