import { SET_LOGIN, GET_LOGIN, CHANGE_PASSWORD, CLEAR_LOGIN } from '../constants'

const loginReducer = (state = { changePassword: false, token: '', role: 4 }, action) => {
  switch (action.type) {
    case SET_LOGIN: return action.payload
    case GET_LOGIN: return { ...state, token: action.payload, role: action.role }
    case CHANGE_PASSWORD: return { ...state, changePassword: action.payload }
    case CLEAR_LOGIN: return action.payload
    default: return state
  }
}

export default loginReducer
