import { GET_DELIVERY, SET_DELIVERY, UPDATE_DELIVERY} from '../constants'
import deliveryService from '../services/deliveryService'
import toastr from 'toastr'

const getDelivery = (token, id) => async (dispatch) => {
  try {
    const delivery = await deliveryService.getDelivery(token, id)
    dispatch(getDeliverySuccess(delivery))
  } catch (err) {
    console.log('Bad delivery request, please try loading again.')
  }
}

const getDeliverySuccess = (delivery) => ({
  type: GET_DELIVERY,
  payload: delivery
})

const setDelivery = (delivery) => ({
  type: SET_DELIVERY,
  payload: delivery
})

const updateDelivery = (token, id, delivery) => async (dispatch) => {
  try {
    const res = await deliveryService.updateDelivery(token, id, delivery)
    if (res?.status === 401) { toastr.error('You are unauthorized to perform this operation!') }
    if (res?.status === 404) { toastr.error('Operation did not found!') }
    if (res?.status === 400) { toastr.error('Bad Request.') }
    if (res?.status === 204) {
      toastr.success('Delivery updated successfully!')
      dispatch(updateDeliverySuccess({ id, ...delivery }))
    }
  } catch (err) {
    toastr.error('Connection error!')
  }
}

const updateDeliverySuccess = (delivery) => ({
  type: UPDATE_DELIVERY,
  payload: delivery
})

export { getDelivery, setDelivery, updateDelivery }
