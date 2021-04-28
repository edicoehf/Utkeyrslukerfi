import { combineReducers } from 'redux'
import statusCode from './statusCodeReducer'
import login from './loginReducer'
import drivers from './driversReducer'

export default combineReducers({
  statusCode,
  login,
  drivers
})
