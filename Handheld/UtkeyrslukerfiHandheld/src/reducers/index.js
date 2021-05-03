import { combineReducers } from 'redux'
import statusCode from './statusCodeReducer'
import login from './loginReducer'
import drivers from './driversReducer'
import deliveries from './deliveryReducer'
import signingProcess from './signingProcessReducer'
import recipientTitle from './recipientTitleReducer'

export default combineReducers({
  statusCode,
  login,
  drivers,
  deliveries,
  signingProcess,
  recipientTitle
})
