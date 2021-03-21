import { GET_DELIVERY, SET_DELIVERY } from '../constants'
import deliveryService from '../services/deliveryService'

const getDelivery = (token, id) => async (dispatch) => {
  try {
    const delivery = await deliveryService.getDelivery(token, id)
    dispatch(getDeliverySuccess(delivery))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getDeliverySuccess = (delivery) => ({
  type: GET_DELIVERY,
  payload: delivery
})

const setDelivery = (obj) => ({
  type: SET_DELIVERY,
  payload: obj
})

export { getDelivery, setDelivery }