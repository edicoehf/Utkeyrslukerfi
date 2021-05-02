import React from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useSelector } from 'react-redux'
import styles from '../../styles/statusCodedropdown'

const StatusCodeDropdown = ({ status, setStatus }) => {
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>Staða</Text>
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

export default StatusCodeDropdown
