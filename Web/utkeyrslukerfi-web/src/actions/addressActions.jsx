import { CREATE_DELIVERY_ADDRESS, CREATE_PICKUP_ADDRESS } from '../constants'
import addressService from '../services/addressService'
import toastr from 'toastr'

const createDeliveryAddress = (token, address) => async (dispatch) => {
	try {
		const res = await addressService.createDeliveryAddress(token, address)
		if (res?.status === 401) { toastr.error('You are unauthorized to perform this operation!') }
		if (res?.status === 404) { toastr.error('Operation did not found!') }
		if (res?.status === 400) { toastr.error('Bad Request.') }
		if (res?.status === 201) {
			let id = await res.json();
			toastr.success('Address created successfully!')
			dispatch(createDeliveryAddressSuccess(address, id))
		}
	} catch (err) {
		toastr.error('Connection error!')
	}
}

const createDeliveryAddressSuccess = (address, id) => ({
	type: CREATE_DELIVERY_ADDRESS,
	payload: { deliveryAddress: address, id: id }
})

const createPickupAddress = (token, address) => async (dispatch) => {
	try {
		const res = await addressService.createPickupAddress(token, address)
		if (res?.status === 401) { toastr.error('You are unauthorized to perform this operation!') }
		if (res?.status === 404) { toastr.error('Operation did not found!') }
		if (res?.status === 400) { toastr.error('Bad Request.') }
		if (res?.status === 201) {
			let id = await res.json();
			toastr.success('Address created successfully!')
			dispatch(createPickupAddressSuccess(address, id))
		}
	} catch (err) {
		toastr.error('Connection error!')
	}
}

const createPickupAddressSuccess = (address, id) => ({
	type: CREATE_PICKUP_ADDRESS,
	payload: { pickupAdress: address, id: id }
})

export { createDeliveryAddress, createPickupAddress }
