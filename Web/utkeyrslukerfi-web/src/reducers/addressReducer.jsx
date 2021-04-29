import { CREATE_ADDRESS } from '../constants'

const addressReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ADDRESS: return action.payload
    default: return state
  }
}

export default addressReducer