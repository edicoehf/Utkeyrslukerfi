import { LOGIN_URL } from '../constants'

const loginUser = async (credentials) => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'same-origin',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      },
      body: JSON.stringify(credentials)
    })
    return response.text()
  } catch (err) {
    console.error(err)
  }
}
export default loginUser
