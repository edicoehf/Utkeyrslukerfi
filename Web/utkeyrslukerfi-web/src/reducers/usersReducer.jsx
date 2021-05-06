import { GET_USERS, CREATE_USER, GET_DRIVERS, UPDATE_USER } from '../constants'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS: return action.payload
    case CREATE_USER: return [...state, action.payload]
    case GET_DRIVERS: return action.payload
    case UPDATE_USER: {
      const newState = [...state]
      const indx = newState.findIndex((x) => x.id === action.payload.id)
      newState[indx] = action.payload
      return [...newState]
    }
    default: return state
  }
}

export default usersReducer
