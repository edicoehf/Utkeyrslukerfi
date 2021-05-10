import {
  GET_VEHICLES,
} from '../constants'

const vehiclesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_VEHICLES: return action.payload
    default: return state
  }
}

export default vehiclesReducer
