/**
 * @format
 */

import 'react-native'
import React from 'react'
import App from '../App'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../src/reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

it('App renders correctly', () => {
  const app = renderer.create(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <App />
    </Provider>
  ).toJSON()
  expect(app).toMatchSnapshot()
})
