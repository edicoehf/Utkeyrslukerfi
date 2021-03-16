import { combineReducers } from 'redux'
import users from './userReducer'
import deliveries from './deliveryReducer'

export default combineReducers({
  users, 
  deliveries
})
