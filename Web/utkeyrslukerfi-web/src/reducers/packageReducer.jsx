import { GET_VIEWING_PACKAGE, SET_VIEWING_PACKAGE } from '../constants'

const packageReducer = (state = { viewingPackage: {} }, action) => {
  switch (action.type) {
    case GET_VIEWING_PACKAGE: return { ...state, viewingPackage: action.payload }
    case SET_VIEWING_PACKAGE: return { ...state, viewingPackage: action.payload }
    default: return state
  }
}

export default packageReducer
