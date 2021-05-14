let enzyme = require('enzyme')
let Adapter = require('enzyme-adapter-react-16')
import '@testing-library/jest-dom/extend-expect'

enzyme.configure({ adapter: new Adapter() })