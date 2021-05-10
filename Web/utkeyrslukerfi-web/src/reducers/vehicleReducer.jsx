import {
  GET_VIEWING_VEHICLE,
  SET_VIEWING_VEHICLE
} from '../constants'

const vehicleReducer = (state = [], action) => {
  switch (action.type) {
    case GET_VIEWING_VEHICLE: return action.payload
    case SET_VIEWING_VEHICLE: return action.payload
    default: return state
  }
}

export default vehicleReducer
