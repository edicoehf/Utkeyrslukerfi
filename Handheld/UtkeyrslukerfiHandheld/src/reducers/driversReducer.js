import { GET_DRIVERS } from '../constants'

const driversReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DRIVERS: return action.payload
    default: return state
  }
}

export default driversReducer
