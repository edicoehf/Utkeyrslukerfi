/**
 * @format
 */

import { AppRegistry } from 'react-native'
import React from 'react'
import App from './App'
import { name as appName } from './app.json'
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

const ReduxApp = () => (
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp)
