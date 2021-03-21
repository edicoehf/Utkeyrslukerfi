import { SET_TOKEN, GET_TOKEN } from '../constants'

const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case SET_TOKEN: return action.payload
    case GET_TOKEN: return action.payload
    default: return state
  }
}

export default tokenReducer
