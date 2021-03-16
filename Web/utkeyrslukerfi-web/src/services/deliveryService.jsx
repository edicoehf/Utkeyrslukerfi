import { DELIVERIES_URL } from '../constants'

const getDeliveryService = () => {
  return {
    getDeliveries: () => fetch(DELIVERIES_URL).then(d => d.json()).then(d => d)
  }
}

export default getDeliveryService()
