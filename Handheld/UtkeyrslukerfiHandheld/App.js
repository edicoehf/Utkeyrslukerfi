import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppContainer from './src/routes'
import Login from './src/components/Login'
import { getLogin } from './src/actions/loginActions'

const App = () => {
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLogin())
  }, [])

  if (!token || token === '') {
    return <Login />
  }
  return (
    <AppContainer />

  )
}

export default App