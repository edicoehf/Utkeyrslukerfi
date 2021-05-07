import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'

// Header Title - Title of recipient is viewable during the delivery process 
const NameTitle = () => {
  const recipientTitle = useSelector(({ recipientTitle }) => recipientTitle)

  return (
    <Text>{recipientTitle}</Text>
  )
}

export default NameTitle
