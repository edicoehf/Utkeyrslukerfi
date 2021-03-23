import { GET_VIEWING_PACKAGE, SET_VIEWING_PACKAGE } from '../constants'

const packageReducer = (state = [], action) => {
  switch (action.type) {
    case GET_VIEWING_PACKAGE: return action.payload 
    case SET_VIEWING_PACKAGE: return action.payload
    default: return state
  }
}

export default packageReducer
