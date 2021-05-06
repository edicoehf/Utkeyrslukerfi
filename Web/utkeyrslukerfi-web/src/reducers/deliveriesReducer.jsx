import { GET_DELIVERIES, UPDATE_DELIVERY } from '../constants'

const deliveriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DELIVERIES: return action.payload
    case UPDATE_DELIVERY: {
      const newState = [...state]
      const indx = newState.findIndex((x) => x.id === action.payload.id)
      newState[indx] = action.payload
      return [...newState]
    }
    default: return state
  }
}

export default deliveriesReducer
