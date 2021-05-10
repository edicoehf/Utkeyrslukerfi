import { VEHICLE_URL } from '../constants'

const vehicleService = () => {
  return {
    getVehicles: (token) => fetch(VEHICLE_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    getVehicle: (token, id) => fetch(VEHICLE_URL + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(d => d.json()).then(d => d),
    createVehicle: (token, vehicle) => fetch(VEHICLE_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(vehicle)
    }).then(r => { if (r.ok) { return r.json() } else { return r } }),
    updateVehicle: (token, id, vehicle) => fetch(VEHICLE_URL + `/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify(vehicle)
    }).then(r => r)
  }
}

export default vehicleService()
