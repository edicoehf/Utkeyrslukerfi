import { GET_DELIVERIES, GET_DELIVERY } from '../constants'

const deliveryReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DELIVERIES: return action.payload
    case GET_DELIVERY: return action.payload
    default: return state
  }
}

export default deliveryReducer