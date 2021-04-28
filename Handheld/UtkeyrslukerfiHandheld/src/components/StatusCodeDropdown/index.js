import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { useSelector } from 'react-redux'

const StatusCodeDropdown = ({ status, setStatus }) => {
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)

  return (
    <DropDownPicker
      items={[
        { label: availableStatusCodes[1], value: 1 },
        { label: availableStatusCodes[2], value: 2 },
        { label: availableStatusCodes[3], value: 3 }
      ]}
      defaultValue={status}
      containerStyle={{ height: 40 }}
      style={{ backgroundColor: '#fafafa' }}
      temStyle={{
        justifyContent: 'flex-start'
      }}
      dropDownStyle={{ backgroundColor: '#fafafa' }}
      onChangeItem={item => setStatus(item.value)}
    />
  )
}

export default StatusCodeDropdown
