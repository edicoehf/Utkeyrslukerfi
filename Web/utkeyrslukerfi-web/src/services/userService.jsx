import { USER_URL } from '../constants'

const userService = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  return {
    getUsers: () => fetch(USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    getUser: (email) => fetch(USER_URL+`/by-email?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    createUser: (user) => fetch(USER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then(r => r.json()),
    updatePassword: (id, user) => fetch(USER_URL+'/'+id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'PUT',
      body: JSON.stringify(user)
    }).then(r => r.json())
  }
}

export default userService()
