import { GET_USERS, CREATE_USER } from '../constants'

export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS: return action.payload
    case CREATE_USER: return [...state, action.payload]
    default: return state
  }
}
