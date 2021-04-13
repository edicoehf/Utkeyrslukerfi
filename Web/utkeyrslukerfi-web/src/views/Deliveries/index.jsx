import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { getDeliveries } from '../../actions/deliveriesActions'
import { setDelivery } from '../../actions/deliveryActions'
import '../../styles/deliveries.css'

const Deliveries = ({ getDeliveries, setDelivery }) => {
  const history = useHistory()
  const token = useSelector(({ login }) => login.token)
  const deliveries = useSelector(({ deliveries }) => deliveries)

  useEffect(() => {
    if (token) {
      getDeliveries(token)
    }
  }, [token])

  const navigateToDelivery = (obj) => {
    setDelivery(obj)
    history.push(`/deliveries/${obj.id}`)
  }

  const renderRows = () => {
    return deliveries.map(function (obj, id) {
      return (
        <tr key={id} onClick={() => navigateToDelivery(obj)}>
          <td>{obj.id}</td>
          <td>{obj.status}</td>
          <td>{obj.recipient}</td>
          <td>{obj.seller}</td>
          <td>{obj.driver.name}</td>
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

export default connect(null, { getDeliveries, setDelivery })(Deliveries)
