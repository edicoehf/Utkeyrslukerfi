import { USER_URL } from '../constants'

const userService = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  return {
    getUsers: () => fetch(USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    createUSer: (user) => fetch(USER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then(r => r.json())
  }
}

export default userService()
