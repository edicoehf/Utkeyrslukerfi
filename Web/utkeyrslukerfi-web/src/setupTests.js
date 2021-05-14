const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
import '@testing-library/jest-dom/extend-expect'

enzyme.configure({ adapter: new Adapter() })