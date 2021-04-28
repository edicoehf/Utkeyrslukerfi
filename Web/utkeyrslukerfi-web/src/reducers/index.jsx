import { combineReducers } from 'redux'
import users from './usersReducer'
import deliveries from './deliveriesReducer'
import delivery from './deliveryReducer'
import user from './userReducer'
import login from './loginReducer'
import packages from './packagesReducer'
import pack from './packageReducer'
import address from './addressReducer'

export default combineReducers({
  login,
  user,
  users,
  delivery,
  deliveries,
  packages,
  pack,
  address
})
