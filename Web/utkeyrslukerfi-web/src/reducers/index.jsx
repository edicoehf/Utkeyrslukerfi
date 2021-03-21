import { combineReducers } from 'redux'
import users from './usersReducer'
import deliveries from './deliveryReducer'
import user from './userReducer'
import login from './loginReducer'
import token from './tokenReducer'

export default combineReducers({
  login,
  user,
  users,
  deliveries,
  token
})
