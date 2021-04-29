import { combineReducers } from 'redux'
import statusCode from './statusCodeReducer'
import login from './loginReducer'
import drivers from './driversReducer'
import deliveries from './deliveryReducer'

export default combineReducers({
  statusCode,
  login,
  drivers,
  deliveries
})
