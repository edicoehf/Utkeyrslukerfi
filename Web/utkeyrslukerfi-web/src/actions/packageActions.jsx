import { GET_PACKAGES } from '../constants'
import packageService from '../services/packageService'

export const getPackages = (token, id) => async (dispatch) => {
  try {
    const packages = await packageService.getPackages(token, id)
    dispatch(getPackagesSuccess(packages))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getPackagesSuccess = (packages) => ({
  type: GET_PACKAGES,
  payload: packages
})
