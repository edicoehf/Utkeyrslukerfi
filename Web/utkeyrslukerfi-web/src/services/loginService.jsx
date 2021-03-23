import { LOGIN_URL } from '../constants'

const loginService = () => {
  return {
    login: (credentials) => fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'same-origin',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      },
      mode: 'cors',
      body: JSON.stringify(credentials)
    }).then(d => d.json()),
    updatePassword: (token, pass) => fetch(LOGIN_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(pass)
    }).then(d => d)
  }
}

export default loginService()
