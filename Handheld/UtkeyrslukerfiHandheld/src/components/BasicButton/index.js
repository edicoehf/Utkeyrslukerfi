import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from '../../styles/basicButton'
import PropTypes from 'prop-types'

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

BasicButton.propTypes = {
  // Text for the button text
  buttonText: PropTypes.string.isRequired,
  // The function that is triggered on click
  onPressFunction: PropTypes.func.isRequired,
  // Boolean that defaults to false, to disable the button
  disable: PropTypes.bool
}

export default BasicButton
