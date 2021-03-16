import { DELIVERY_URL } from '../constants'

const deliveryService = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return {
    getDeliveries: () => fetch(DELIVERY_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
  }
}

export default deliveryService()
