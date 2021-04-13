import { GET_VIEWING_USER, SET_VIEWING_USER, UPDATE_USER } from '../constants'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_VIEWING_USER: return action.payload
    case SET_VIEWING_USER: return action.payload
    case UPDATE_USER: return action.payload
    default: return state
  }
}

export default userReducer
