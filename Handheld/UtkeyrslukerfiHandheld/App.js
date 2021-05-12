import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppContainer from './src/routes'
import Login from './src/components/Login'
import { getLogin } from './src/actions/loginActions'
import DataWedgeIntents from 'react-native-datawedge-intents'

const App = () => {
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLogin())

    // Register intents, connection to dataWedge for scanning functionalities
    DataWedgeIntents.registerBroadcastReceiver({
      filterActions: [
        'com.zebra.utkeyrslukerfihandheld.ACTION',
        'com.symbol.datawedge.api.RESULT_ACTION'

      ],
      filterCategories: [
        'android.intent.category.DEFAULT'
      ]
    })
  }, [])

  if (!token || token === '') {
    return <Login />
  }
  return (
    <AppContainer />

  )
}

export default App
