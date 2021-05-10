import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getVehicles } from '../../actions/vehiclesActions'
import VehicleDetails from '../../components/VehicleDetails'
import { ImPlus } from 'react-icons/im'

const VehicleList = () => {
  const history = useHistory()
  const token = useSelector(({ login }) => login.token)
  const vehicles = useSelector(({ vehicles }) => vehicles)
  const [vehicleState, setVehicleState] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(getVehicles(token))
    }
    // eslint-disable-next-line
  }, [token])

  useEffect(() => {
    setVehicleState(vehicles)
  }, [vehicles])

  const navigateToCreateVehicle = () => {
    history.push('/vehicles/create')
  }

  return (
    <div className='vehicles'>
      <table className='table table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th>ID</th>
            <th>Bílnúmer</th>
            <th>Rúmmál á skotti</th>
            <th>Hæð</th>
            <th>Lengd</th>
            <th>Breidd</th>
            <th>{/* Edit pen */}</th>
          </tr>
        </thead>
        <tbody>
          {
            vehicleState.length > 0
              ? vehicleState.map((vehic) => (
                <VehicleDetails key={vehic.id} vehicle={vehic} />
                ))
              : null
          }
          <tr>
            <td onClick={() => navigateToCreateVehicle()}><ImPlus size='2em' className='clickable' /></td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
      {
        vehicles.length <= 0
          ? <div className='text-center'>
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
          : null
      }
    </div>
  )
}

export default VehicleList
