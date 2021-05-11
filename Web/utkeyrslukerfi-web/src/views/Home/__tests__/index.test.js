import React from 'react'
import Home from '..'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import reducer from '../../../reducers'

const mockStore = configureStore(reducer);


afterEach(cleanup)
describe('My Connected React-Redux Component', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      role: 1,
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

  it('should dispatch an action on button click', () => {

  })
})