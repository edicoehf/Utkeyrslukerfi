import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from '../../styles/basicButton'

const BasicButton = ({ buttonText, onPressFunction }) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default BasicButton
