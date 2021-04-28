import React, { useState, useEffect, useRef } from 'react'
import { View, Button, Text } from 'react-native'
import { setLogin } from '../../actions/loginActions'
import { useDispatch, useSelector } from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker'
import { getDrivers } from '../../actions/driversActions'

const Login = () => {
  // TODO: Get list of all users to select from
  // TODO: Dropdown menu of all users
  // TODO: When you login add selected user to current use
  // TODO: Footer/Header, but with no buttons (blue lines)
  // TODO: css
  const [selected, setSelected] = useState('') // Currently selected user
  const drivers = useSelector(({ drivers }) => drivers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDrivers())
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(setLogin(selected))
  }

  return (
    <View style={{ minHeight: 300, zIndex: 2 }}>
      <Text style={{ paddingTop: 60 }}>Innskráning</Text>
      <DropDownPicker
        items={
          drivers.map((driver) => {
            return { label: driver.name, value: driver.name }
          })
        }
        placeholder='Velja starfsmann...'
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{ backgroundColor: '#fafafa', height: 120 }}
        onChangeItem={item => setSelected(item.value)}
      />
      <View
        style={{ zIndex: 0 }}
      >
        <Button
          onPress={handleSubmit}
          title='Log In'
        />
      </View>
    </View>
  )
}

export default Login
