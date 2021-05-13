import reducer from '../index'
import getUsers from '../../actions/usersActions'

describe('Testing Reducer', () => {
  it('Should return the initial state', () => {
    let initialState = {
      "deliveries": [],
      "delivery": {},
      "login": {
        "changePassword": false,
        "role": 4,
        "token": "",
      },
      "pack": [],
      "packages": [],
      "user": {},
      "users": [],
      "vehicle": [],
      "vehicles": []
    }
    let users = [
      {}
    ]
    expect(reducer(undefined, {})).toEqual({ ...initialState })
  })
})