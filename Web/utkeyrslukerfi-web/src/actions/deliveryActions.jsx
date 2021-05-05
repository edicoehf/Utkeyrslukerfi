import {
  UPDATE_DELIVERY,
  GET_VIEWING_DELIVERY,
  SET_VIEWING_DELIVERY } from '../constants'
import deliveryService from '../services/deliveryService'
import toastr from 'toastr'

export const getViewingDelivery = (token, id) => async (dispatch) => {
  try {
    const delivery = await deliveryService.getDelivery(token, id)
    dispatch(getViewingDeliverySuccess(delivery))
  } catch (err) {
    console.log('Bad delivery request, please try loading again.')
  }
}

const getViewingDeliverySuccess = (delivery) => ({
  type: GET_VIEWING_DELIVERY,
  payload: delivery
})

export const setViewingDelivery = (delivery) => ({
  type: SET_VIEWING_DELIVERY,
  payload: delivery
})

export const updateDelivery = (token, id, delivery) => async (dispatch) => {
  try {
    const res = await deliveryService.updateDelivery(token, id, delivery)
    if (res?.status === 401) { toastr.error('Þú hefur ekki leifi til að uppfæra sendingu.') }
    if (res?.status === 404) { toastr.error('Sending fannst ekki.') }
    if (res?.status === 400) { toastr.error('Slæm beiðni.') }
    if (res?.status === 204) {
      toastr.success('Sending hefur verið uppfærð!')
      dispatch(updateDeliverySuccess({ id, ...delivery }))
    }
  } catch (err) {
    toastr.error('Ekki náðist samband við netþjón.')
  }
}

const updateDeliverySuccess = (delivery) => ({
  type: UPDATE_DELIVERY,
  payload: delivery
})
