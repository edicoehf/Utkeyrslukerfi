import React from 'react'
import ReactDOM from 'react-dom'
import { Login } from '..'
import { render, cleanup } from '@testing-library/react'
import { shallow } from 'enzyme'
import '@testing-library/jest-dom'


afterEach(cleanup)
test('Renders the Login component without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Login />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('Renders Login correctly', () => {
  const props = {
    dispatch: jest.fn(),
    count: 3,
    id: 'random id',
  }
  const wrapper = shallow(<Login {...props} />)
  expect(wrapper.find('p').text()).toEqual('Login')
})