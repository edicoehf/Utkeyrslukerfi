import { DELIVERY_URL } from '../constants'

const deliveryService = () => {
  return {
    getDelivery: (token, id) => fetch(`${DELIVERY_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    changeDeliveryStatus: (token, delivery) => fetch(`${DELIVERY_URL}/${delivery.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify(delivery)
    }).then(d => d.json()),
    getDeliveries: (token) => fetch(DELIVERY_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d)
  }
}

export default deliveryService()
