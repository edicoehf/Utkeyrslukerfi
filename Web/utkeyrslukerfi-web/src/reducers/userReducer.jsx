import { GET_LOGGED_IN_USER, UPDATE_LOGGED_IN_USER, GET_VIEWING_USER, SET_VIEWING_USER, UPDATE_VIEWING_USER } from '../constants'

const userReducer = (state = { loggedInUser: {}, viewingUser: {} }, action) => {
  switch (action.type) {
    case GET_LOGGED_IN_USER: return { ...state, loggedInUser: action.payload }
    case UPDATE_LOGGED_IN_USER: return { ...state, loggedInUser: action.payload }
    case GET_VIEWING_USER: return { ...state, viewingUser: action.payload }
    case SET_VIEWING_USER: return { ...state, viewingUser: action.payload }
    case UPDATE_VIEWING_USER: return { ...state, viewingUser: action.payload }
    default: return state
  }
}

export default userReducer
