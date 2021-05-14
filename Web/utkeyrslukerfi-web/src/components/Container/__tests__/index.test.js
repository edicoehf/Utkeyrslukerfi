import React from 'react'
import ReactDOM from 'react-dom'
import Container from '..'
import { render as rtlRender, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

afterEach(cleanup)
test('Renders the component without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Container />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('Renders Container correctly', () => {
  const { getByTestId } = rtlRender(<Container />)
  expect(getByTestId('container')).not.toBeEmptyDOMElement()
})
