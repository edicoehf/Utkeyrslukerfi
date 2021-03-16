import { DELIVERY_URL } from '../constants'

const getDeliveryService = () => {
  return {
    getDeliveries: () => fetch(DELIVERY_URL).then(d => d.json()).then(d => d)
  }
}

export default getDeliveryService()
