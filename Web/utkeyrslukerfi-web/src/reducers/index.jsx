import { combineReducers } from 'redux'
import users from './usersReducer'
import deliveries from './deliveriesReducer'
import delivery from './deliveryReducer'
import user from './userReducer'

export default combineReducers({
  user,
  users,
  delivery,
  deliveries
})
