import { combineReducers } from 'redux'
import statusCode from './statusCodeReducer'
import login from './loginReducer'

export default combineReducers({
  statusCode,
  login
})
