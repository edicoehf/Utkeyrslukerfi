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
    if (res?.status === 401) { toastr.error('401 error') }
    if (res?.status === 404) { toastr.error('404 error') }
    if (res?.status === 204) {
      toastr.success('204 success')
      dispatch(updateDeliverySuccess({ id, ...delivery }))
    }
  } catch (err) {
    toastr.error('other error')
  }
}

const updateDeliverySuccess = (delivery) => ({
  type: UPDATE_DELIVERY,
  payload: delivery
})

export { getDelivery, setDelivery, updateDelivery }
