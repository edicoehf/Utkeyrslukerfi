import { LOGIN_URL } from '../constants'

const loginUser = async (credentials) => {
  console.log(credentials);
  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    return response.text();
  } catch (err) {
    console.error(err);
  }
}
export default loginUser;
