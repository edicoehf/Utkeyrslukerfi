import { GET_USERS, CREATE_USER } from '../constants'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS: return action.payload
    case CREATE_USER: return [...state, action.payload]
    default: return state
  }
}

export default usersReducer
