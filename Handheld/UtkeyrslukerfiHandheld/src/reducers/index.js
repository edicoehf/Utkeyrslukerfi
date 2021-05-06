import { combineReducers } from 'redux'
import statusCode from './statusCodeReducer'
import login from './loginReducer'
import drivers from './driversReducer'
import deliveries from './deliveryReducer'
import recipientTitle from './recipientTitleReducer'

export default combineReducers({
  statusCode,
  login,
  drivers,
  deliveries,
  recipientTitle
})
