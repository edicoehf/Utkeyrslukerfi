import { DELIVERY_URL } from '../constants'

const deliveryService = () => {
  return {
    getDelivery: (token, id) => fetch(`${DELIVERY_URL}/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(d => d),
    updateDelivery: (token, delivery) => fetch(`${DELIVERY_URL}/${delivery.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify(delivery)
    }).then(d => d),
    getDeliveries: (token) => fetch(DELIVERY_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    updateDeliveries: (token, deliveries) => fetch(DELIVERY_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify(deliveries)
    }).then(d => d)
  }
}

export default deliveryService()
