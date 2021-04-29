import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { useSelector } from 'react-redux'

const StatusCodeDropdown = ({ status, setStatus }) => {
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)

  return (
    <DropDownPicker
      items={
        Object.keys(availableStatusCodes).map(function (k) {
          return (
            { label: availableStatusCodes[k], value: k }
          )
        })
      }
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
