import { CREATE_ADDRESS } from '../constants'
import addressService from '../services/addressService'
import toastr from 'toastr'

const createAddress = (token, address) => async (dispatch) => {
	try {
		const res = await addressService.createAddress(token, address)
		if (res?.status === 401) { toastr.error('You are unauthorized to perform this operation!') }
		if (res?.status === 404) { toastr.error('Operation did not found!') }
		if (res?.status === 400) { toastr.error('Bad Request.') }
		if (res?.status === 204) {
			toastr.success('Address created/updated successfully!')
			dispatch(createAddressSuccess(address))
		}
	} catch (err) {
		toastr.error('Connection error!')
	}
}

const createAddressSuccess = (address) => ({
	type: CREATE_ADDRESS,
	payload: address
})

export { createAddress }
