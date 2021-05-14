import reducer from '../index'
import usersReducer from '../userReducer'


const initialState = {
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

describe('Testing Reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ ...initialState })
  })
  it('Shoud test GET_USERS action', () => {
    let users = [
      {
        "id": "1760f20c-788b-4694-19b2-08d913986ac6",
        "name": "skrifstofa",
        "email": "skrifstofa@edico.is",
        "role": 2,
        "changePassword": true
      },
      {
        "id": "1760f20c-788b-4694-19b2-08d914986ac6",
        "name": "skrifstofa2",
        "email": "skrifstofa@edico.is",
        "role": 2,
        "changePassword": true
      }
    ]
    const action = {
      type: 'GET_USERS',
      payload: users
    }
    const result = usersReducer(initialState, action)
    expect(result.users).toEqual([])
  })
})