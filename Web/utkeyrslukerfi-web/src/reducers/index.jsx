import { combineReducers } from 'redux'
import users from './usersReducer'
import deliveries from './deliveriesReducer'
import delivery from './deliveryReducer'
import user from './userReducer'
import login from './loginReducer'
import token from './tokenReducer'

export default combineReducers({
  login,
  user,
  users,
  delivery,
  deliveries,
  token
})
