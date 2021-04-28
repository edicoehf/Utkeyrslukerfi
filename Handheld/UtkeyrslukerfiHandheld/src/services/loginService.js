import { DRIVER_LOGIN_URL, LOGOUT_URL } from '../constants'

const loginService = () => {
  return {
    login: (name) => fetch(DRIVER_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'same-origin',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      },
      mode: 'cors',
      body: JSON.stringify(name)
    }).then(d => d.json()),
    logout: (token) => fetch(LOGOUT_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d)
  }
}

export default loginService()
