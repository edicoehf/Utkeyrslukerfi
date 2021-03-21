import { GET_DELIVERY, SET_DELIVERY } from '../constants'
import deliveryService from '../services/deliveryService'

const getDelivery = (id) => async (dispatch) => {
  try {
    console.log("here: ", id);
    const delivery = await deliveryService.getDelivery(id)
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

export {getDelivery, setDelivery }