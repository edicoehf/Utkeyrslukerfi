import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from '../../styles/basicButton'

const BasicButton = ({ buttonText, onPressFunction, disable = false }) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      style={disable ? styles.buttonDisabled : styles.button}
      disabled={disable}
    >
      <Text style={disable ? styles.buttonTextDisabled : styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default BasicButton
