import {
  UPDATE_DELIVERY,
  GET_VIEWING_DELIVERY,
  SET_VIEWING_DELIVERY
} from '../constants'
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
    const deliveryInputModel = {
      ...delivery,
      PickupAddressStreetName: delivery?.pickupAddress?.streetName,
      PickupAddressHouseNumber: delivery?.pickupAddress?.houseNumber,
      PickupAddressZipCode: delivery?.pickupAddress?.zipCode,
      PickupAddressCity: delivery?.pickupAddress?.city,
      PickupAddressCountry: delivery?.pickupAddress?.counntry,
      DeliveryAddressStreetName: delivery?.deliveryAddress?.streetName,
      DeliveryAddressHouseNumber: delivery?.deliveryAddress?.houseNumber,
      DeliveryAddressZipCode: delivery?.deliveryAddress?.zipCode,
      DeliveryAddressCity: delivery?.deliveryAddress?.city,
      DeliveryAddressCountry: delivery?.deliveryAddress?.counntry,
      VehicleID: delivery?.vehicle?.id,
      DriverID: delivery?.driver?.id
    }
    const res = await deliveryService.updateDelivery(token, id, deliveryInputModel)
    console.log(res)
    if (res?.status === 401) { toastr.error('Þú hefur ekki leyfi til að uppfæra sendingu.') }
    if (res?.status === 404) { toastr.error('Sending fannst ekki.') }
    if (res?.status === 400) { toastr.error('Slæm beiðni.') }
    if (res?.status === 204) {
      dispatch(updateDeliverySuccess(delivery))
      toastr.success('Sending hefur verið uppfærð!')
    }
  } catch (err) {
    toastr.error('Ekki náðist samband við netþjón.')
  }
}

const updateDeliverySuccess = (delivery) => ({
  type: UPDATE_DELIVERY,
  payload: delivery
})
