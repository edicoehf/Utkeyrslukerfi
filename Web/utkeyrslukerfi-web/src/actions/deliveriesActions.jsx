import { GET_DELIVERIES } from '../constants'
import deliveryService from '../services/deliveryService'
import toastr from 'toastr'

export const getDeliveries = (token) => async (dispatch) => {
  try {
    const deliveries = await deliveryService.getDeliveries(token)
    dispatch(getDeliveriesSuccess(deliveries))
  } catch (err) {
    toastr.error('Bad request, please try loading again.')
  }
}

const getDeliveriesSuccess = (deliveries) => ({
  type: GET_DELIVERIES,
  payload: deliveries
})
