import React from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useSelector } from 'react-redux'
import styles from '../../styles/statusCodedropdown'
import PropTypes from 'prop-types'

// Simple dropdown menu to select different status codes
const StatusCodeDropdown = ({ status, setStatus, label }) => {
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>
      <DropDownPicker
        items={
          Object.keys(availableStatusCodes).map(function (k) {
            return (
              { label: availableStatusCodes[k], value: k }
            )
          })
        }
        placeholder={availableStatusCodes[status]}
        defaultValue={status}
        containerStyle={styles.container}
        style={styles.preDropdown}
        itemStyle={styles.items}
        dropDownStyle={styles.dropdown}
        onChangeItem={item => setStatus(item.value)}
      />
    </View>
  )
}

StatusCodeDropdown.propTypes = {
  // The number of the status, state to keep track of the current status
  status: PropTypes.isRequired,
  // Function to update the status state
  setStatus: PropTypes.func.isRequired,
  // The label for the dropdown
  label: PropTypes.string.isRequired
}

export default StatusCodeDropdown
