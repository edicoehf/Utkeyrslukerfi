import { GET_DELIVERIES } from '../constants'
import deliveryService from '../services/deliveryService'

export const getDeliveries = () => async (dispatch) => {
  try {
    const deliveries = await deliveryService.getDeliveries()
    dispatch(getDeliveriesSuccess(deliveries))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getDeliveriesSuccess = (deliveries) => ({
  type: GET_DELIVERIES,
  payload: deliveries
})