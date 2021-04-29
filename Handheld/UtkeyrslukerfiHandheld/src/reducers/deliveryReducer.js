import { GET_DELIVERIES } from '../constants'

const deliveryReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DELIVERIES: return action.payload
    default: return state
  }
}

export default deliveryReducer
