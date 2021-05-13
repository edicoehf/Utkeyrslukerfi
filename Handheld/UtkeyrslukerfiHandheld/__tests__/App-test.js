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
import AppContainer from '../src/routes'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

it('App renders correctly', () => {
  const app = renderer.create(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <App />
  </Provider>
  ).toJSON()
  expect(app).toMatchSnapshot()
})

it('App container renders correctly', () => {
  const list = renderer.create(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <AppContainer />
    </Provider>
  ).toJSON()
  expect(list).toMatchSnapshot()

})

// it('checks if Async Storage is used', async () => {
//   await asyncOperationOnAsyncStorage();

//   expect(AsyncStorage.getItem).toBeCalledWith('token');
// })
