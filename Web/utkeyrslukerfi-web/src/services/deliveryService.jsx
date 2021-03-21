import { DELIVERY_URL } from '../constants'

const deliveryService = () => {
  return {
    getDeliveries: (token) => fetch(DELIVERY_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    getDelivery: (token, id) => fetch(`DELIVERY_URL/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    updateDelivery: (token, delivery) => fetch(`DELIVERY_URL/${delivery.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify(delivery)
    }).then(d => d.json()),
  }
}

export default deliveryService()
