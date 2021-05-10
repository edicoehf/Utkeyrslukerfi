import React from 'react'
import ReactDOM from 'react-dom'
import Container from '..'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'


afterEach(cleanup)
test('Renders the component without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Container />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('Renders Container correctly', () => {
  const { getByTestId } = render(<Container />)
  expect(getByTestId('container')).not.toBeEmptyDOMElement()
})
