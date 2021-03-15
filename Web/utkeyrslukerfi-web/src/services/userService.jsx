import { USER_URL } from '../constants'

const userService = () => {
  return {
    getUsers: () => fetch(USER_URL).then(d => d.json()).then(d => d),
    createUSer: (user) => fetch(USER_URL, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then(r => r.json())
  }
}

export default userService()
