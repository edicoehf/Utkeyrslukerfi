import { SET_LOGIN, GET_LOGIN, CHANGE_PASSWORD } from '../constants'

const loginReducer = (state = { changePassword: false, token: '' }, action) => {
  switch (action.type) {
    case SET_LOGIN: return action.payload
    case GET_LOGIN: return { ...state, token: action.payload }
    case CHANGE_PASSWORD: return { ...state, changePassword: action.payload }
    default: return state
  }
}

export default loginReducer
