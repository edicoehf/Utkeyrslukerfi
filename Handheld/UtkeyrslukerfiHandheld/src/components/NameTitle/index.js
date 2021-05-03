import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'

// LogutButton - logout functionality triggered when pressed
const NameTitle = () => {
  const recipientTitle = useSelector(({ recipientTitle }) => recipientTitle)

  return (
    // <Text>{recipientTitle}</Text>
    <></>
  )
}

export default NameTitle
