import { CREATE_DELIVERY_ADDRESS, CREATE_PICKUP_ADDRESS } from '../constants'

const addressReducer = (state = { }, action) => {
  switch (action.type) {
    case CREATE_DELIVERY_ADDRESS: return action.payload
    case CREATE_PICKUP_ADDRESS: return action.payload
    default: return state
  }
}

export default addressReducer