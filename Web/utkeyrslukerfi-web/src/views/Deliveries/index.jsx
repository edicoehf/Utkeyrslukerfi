import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDeliveries } from '../../actions/deliveryActions'

const Deliveries = ({ getDeliveries, deliveries, token }) => {
  const history = useHistory()

  useEffect(() => {
    if (token) {
      getDeliveries(token)
    }
  }, [token])

  const navigateToDelivery = (obj) => {
    history.push(`/deliveries/${obj.id}`, { params: obj })
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
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>
              ID
            </th>
            <th>
              Staða
            </th>
            <th>
              Mótakandi
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
          {renderRows()}
        </tbody>
      </table>
      <hr />
    </div>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    deliveries: reduxStoreState.deliveries,
    token: reduxStoreState.token
  }
}

export default connect(mapStateToProps, { getDeliveries })(Deliveries)
