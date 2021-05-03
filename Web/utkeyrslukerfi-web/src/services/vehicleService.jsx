import { VEHICLE_URL } from '../constants'

const vehicleService = () => {
  return {
    getVehicles: (token) => fetch(VEHICLE_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
  }
}

export default vehicleService()