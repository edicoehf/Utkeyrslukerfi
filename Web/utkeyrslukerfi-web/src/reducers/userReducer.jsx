import { SET_USER } from '../constants'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER: return action.payload
    default: return state
  }
}

export default userReducer
