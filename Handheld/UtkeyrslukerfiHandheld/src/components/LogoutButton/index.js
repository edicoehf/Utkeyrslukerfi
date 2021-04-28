import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/loginActions'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// LogutButton - logout functionality triggered when pressed
const LogoutButton = () => {
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()
  const handleLogout = () => {
    if (token) {
      dispatch(logout(token))
    }
  }

  return (
    <TouchableOpacity onPress={handleLogout}>
      <View>
        <Icon name='logout' size={40} color='#000' />
      </View>
    </TouchableOpacity>
  )
}

export default LogoutButton
