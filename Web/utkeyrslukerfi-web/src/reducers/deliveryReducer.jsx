import { GET_DELIVERY, SET_DELIVERY } from '../constants'

const deliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DELIVERY: return action.payload
    case SET_DELIVERY: return action.payload
    default: return state
  }
}

export default deliveryReducer
