import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDeliveries } from '../../actions/deliveriesActions'
import { setDelivery } from '../../actions/deliveryActions'
import { getDrivers } from '../../actions/usersActions'
import { getVehicles } from '../../actions/vehiclesActions'
import configData from '../../constants/config.json'
import '../../styles/deliveries.css'

const Deliveries = () => {
  const history = useHistory()
  const token = useSelector(({ login }) => login.token)
  const deliveries = useSelector(({ deliveries }) => deliveries)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(getDeliveries(token))
      dispatch(getDrivers(token))
      dispatch(getVehicles(token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const navigateToDelivery = (obj) => {
    dispatch(setDelivery(obj))
    history.push(`/deliveries/${obj.id}`)
  }

  const renderRows = () => {
    return deliveries.map(function (obj, id) {
      return (
        <tr key={id} onClick={() => navigateToDelivery(obj)}>
          <td>{obj.id}</td>
          <td>{configData.STATUS[obj.status]}</td>
          <td>{obj.recipient}</td>
          <td>{obj.seller === null ? 'N/A' : obj.seller}</td>
          <td>{obj.driver === null ? 'N/A' : obj.driver.name}</td>
          <td>{obj.deliveryAddress.streetName} {obj.deliveryAddress.houseNumber}</td>
          <td>{obj.pickupAddress.streetName} {obj.pickupAddress.houseNumber}</td>
        </tr>
      )
    })
  }
  return (
    <div className='deliveries'>
      <table className='table table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th>
              ID
            </th>
            <th>
              Staða
            </th>
            <th>
              Móttakandi
            </th>
            <th>
              Sendandi
            </th>
            <th>
              Bílstjóri
            </th>
            <th>
              Heimilisfang móttakanda
            </th>
            <th>
              Heimilisfang sendanda
            </th>
          </tr>
        </thead>
        <tbody>
          {
            deliveries.length > 0 ? renderRows() : null
          }
        </tbody>
      </table>
      {
        deliveries.length <= 0
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

export default Deliveries
