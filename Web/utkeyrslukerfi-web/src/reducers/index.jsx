import { combineReducers } from 'redux'
import users from './usersReducer'
import deliveries from './deliveriesReducer'
import delivery from './deliveryReducer'
import user from './userReducer'
import login from './loginReducer'
import token from './tokenReducer'
import packages from './packagesReducer'
import pack from './packageReducer'

export default combineReducers({
  login,
  user,
  users,
  delivery,
  deliveries,
  token,
  packages,
  pack
})
