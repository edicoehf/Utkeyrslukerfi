import { USER_URL } from '../constants'

const userService = () => {
  return {
    getUsers: () => fetch(USER_URL).then(d => d.json()).then(d => d)
  }
}

export default userService()
