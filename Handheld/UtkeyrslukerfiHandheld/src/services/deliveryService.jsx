import { DELIVERY_URL } from '../constants'

const deliveryService = () => {
    return {
        changeDeliveryStatus: (token, delivery) => fetch(`${DELIVERY_URL}/${delivery.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'PATCH',
            body: JSON.stringify(delivery)
        }).then(d => d.json())
    }
}

export default deliveryService()
