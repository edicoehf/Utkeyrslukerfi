import { ToastAndroid } from 'react-native'
import { GET_DELIVERIES } from '../constants'
import deliveryService from '../services/deliveryService'

export const getDeliveries = (token) => async (dispatch) => {
  try {
    const deliveries = await deliveryService.getDeliveries(token)
    dispatch(getDeliveriesSuccess(deliveries))
  } catch (err) {
    ToastAndroid.showWithGravity('Ekki tókst að ná í sendingarnar.', ToastAndroid.LONG, ToastAndroid.TOP)
  }
}

const getDeliveriesSuccess = (deliveries) => ({
  type: GET_DELIVERIES,
  payload: deliveries
})
