import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/loginActions'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// LogutButton - logout functionality triggered when pressed
const NameTitle = () => {
  const recipientTitle = useSelector(({ recipientTitle }) => recipientTitle)

  return (
    <Text>{recipientTitle}</Text>
  )
}

export default NameTitle
