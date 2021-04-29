import { GET_PACKAGES, GET_VIEWING_PACKAGE, SET_VIEWING_PACKAGE } from '../constants'
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

export const setViewingPackage = (pack) => ({
  type: SET_VIEWING_PACKAGE,
  payload: pack
})

export const getViewingPackage = (token, id, deliveryID) => async (dispatch) => {
  try {
    const pack = await packageService.getPackage(token, id, deliveryID)
    dispatch(getViewingPackageSuccess(pack))
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getViewingPackageSuccess = (pack) => ({
  type: GET_VIEWING_PACKAGE,
  payload: pack
})
