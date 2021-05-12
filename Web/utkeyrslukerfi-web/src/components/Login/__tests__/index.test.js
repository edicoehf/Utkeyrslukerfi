import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Login from '../'


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore(initState)
store.dispatch = jest.fn()

afterEach(cleanup)
describe('It should test the login form', () => {
  // const { asFragment } = render(<Login />)
  // it('Should test the generic input handler', () => {
  //   let email = 'test@test.com'
  //   component
  //     .find('input[name="netfang"]')
  //     .first()
  //     .simulate('change', { target: { value: email, name: 'netfang' } })
  //   expect(component.state().fields.email).toBe(email)
  // })

  it('Should test the Login', () => {
    const { getByTestId } = ReactDOM.render(
      <Provider store={store}>
        <Login />
      </Provider>)
    expect(getByTestId('login')).toHaveTextContent(0)
  })
})