import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native'
import AppContainer from './src/routes'
import Login from './src/components/Login'
import { getLogin } from './src/actions/loginActions'
import Header from './src/components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLogin())
  }, [])
  // const clear = async (e) => {
  //   await AsyncStorage.clear()
  // }

  // clear();

  if (!token || token === '') {
    return <Login />
  }
  return (
    // <View>
    // < Header />
    //     </View>
      <AppContainer />

  )
}

export default App
