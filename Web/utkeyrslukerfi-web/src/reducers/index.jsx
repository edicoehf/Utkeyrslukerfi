import { combineReducers } from 'redux'
import users from './usersReducer'
import deliveries from './deliveryReducer'
import user from './userReducer'

export default combineReducers({
  user,
  users,
  deliveries
})
