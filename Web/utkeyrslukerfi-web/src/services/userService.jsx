import { USER_URL } from '../constants'

const userService = () => {
  return {
    getUsers: (token) => fetch(USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    getDrivers: (token) => fetch(USER_URL + '/drivers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    getUser: (token, id) => fetch(USER_URL + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    getUserByEmail: (token, email) => fetch(USER_URL + `/by-email?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    createUser: (token, user) => fetch(USER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then(r => { if (r.ok) { return r.json() } else { return r } }),
    updateUser: (token, id, user) => fetch(USER_URL + `/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'PUT',
      body: JSON.stringify(user)
    }).then(r => r)
  }
}

export default userService()
