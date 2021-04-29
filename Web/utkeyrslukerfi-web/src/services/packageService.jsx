import { DELIVERY_URL } from '../constants'

const packageService = () => {
  return {
    getPackages: (token, id) => fetch(DELIVERY_URL + `/${id}/packages`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    getPackage: (token, id, deliveryID) => fetch(DELIVERY_URL + `/${deliveryID}/packages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d)
  }
}

export default packageService()
