import { DELIVERY_URL } from '../constants'

const packageService = () => {
  return {
    getPackages: (token, id) => fetch(DELIVERY_URL`/${id}/packages`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json())
  }
}

export default packageService()
