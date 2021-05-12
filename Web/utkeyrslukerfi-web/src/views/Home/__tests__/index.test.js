import React from 'react'
import Home from '..'
import { Provider } from 'react-redux'
import {mount } from 'enzyme'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import reducer from '../../../reducers'

const mockStore = configureStore(reducer);


afterEach(cleanup)
describe('It should test Home component', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      user: 1,
    })
  })

  component = render(
    <Provider store={store}>
      <Home />
    </Provider>
  )

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot()
  })
})