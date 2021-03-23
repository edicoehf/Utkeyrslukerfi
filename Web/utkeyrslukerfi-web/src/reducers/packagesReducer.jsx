import { GET_PACKAGES, } from '../constants'

const packagesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PACKAGES: return action.payload
    default: return state
  }
}

export default packagesReducer
