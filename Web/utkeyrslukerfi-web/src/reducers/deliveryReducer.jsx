import {
  GET_VIEWING_DELIVERY,
  SET_VIEWING_DELIVERY,
  UPDATE_DELIVERY
} from '../constants'

const deliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_VIEWING_DELIVERY: return action.payload
    case SET_VIEWING_DELIVERY: return action.payload
    case UPDATE_DELIVERY: return action.payload
    default: return state
  }
}

export default deliveryReducer
