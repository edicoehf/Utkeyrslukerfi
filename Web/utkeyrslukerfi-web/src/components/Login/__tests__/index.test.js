import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Login from '../'


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore( initState )
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={ store } >
      <Login />
  </Provider>
)

describe('It should test the login form', () => {
  let component
  beforeEach(() => {
    component = mount(<Login />, { attachTo: document.body })
  })
  it('Should test the generic input handler', () => {
    let email = 'test@test.com'
    component
      .find('input[name="netfang"]')
      .first()
      .simulate('change', { target: { value: email, name: 'netfang' } })
    expect(component.state().fields.email).toBe(email)
  })
})