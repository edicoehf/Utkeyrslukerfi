import { SET_EMAIL, GET_EMAIL } from '../constants'

const loginReducer = (state = '', action) => {
  switch (action.type) {
    case SET_EMAIL: return action.payload
    case GET_EMAIL: return action.payload
    default: return state
  }
}

export default loginReducer
