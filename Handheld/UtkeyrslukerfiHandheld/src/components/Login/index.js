import React, { useState, useEffect } from 'react'
import { View, Text, RefreshControl, ScrollView } from 'react-native'
import { setLogin } from '../../actions/loginActions'
import { useDispatch, useSelector } from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker'
import { getDrivers } from '../../actions/driversActions'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/loginStyles'

const Login = () => {
  const [selected, setSelected] = useState('') // Currently selected driver
  const drivers = useSelector(({ drivers }) => drivers)
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    dispatch(getDrivers())
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(setLogin(selected))
  }

  const onRefresh = () => {
    // Get the drivers
    dispatch(getDrivers())
    setRefreshing(false)
  }

  return (
      <ScrollView 
        contentContainerStyle={styles.mainView}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.dropDown}>
          <Text style={styles.mainText}>Innskráning</Text>
          <DropDownPicker
            items={
              drivers.map((driver) => {
                return { label: driver.name, value: driver }
              })
            }
            placeholder='Velja starfsmann...'
            containerStyle={styles.containerStyle}
            style={styles.dropDownPickerStyle}
            itemStyle={styles.itemStyle}
            dropDownStyle={styles.dropDownStyle}
            onChangeItem={item => setSelected(item.value)}
          />
        </View>
        <View style={styles.loginButton}>
          <BasicButton
            onPressFunction={handleSubmit}
            buttonText='Skrá inn'
          />
        </View>
      </ScrollView>
  )
}

export default Login
