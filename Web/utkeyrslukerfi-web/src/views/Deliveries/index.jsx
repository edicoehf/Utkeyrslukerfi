import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDeliveries } from '../../actions/deliveriesActions'
import { setDelivery } from '../../actions/deliveryActions'
import { getDrivers } from '../../actions/usersActions'
import { getVehicles } from '../../actions/vehiclesActions'
import configData from '../../constants/config.json'
import { BsPencilSquare, BsFunnel } from 'react-icons/bs'
import '../../styles/deliveries.css'
import DeliveryFilterModal from '../../components/DeliveryFilterModal'
import { format } from 'date-fns'

const Deliveries = () => {
  const history = useHistory()
  const token = useSelector(({ login }) => login.token)
  const deliveries = useSelector(({ deliveries }) => deliveries)
  const [deliveryState, setDeliveryState] = useState([])
  const [filterModal, setFilterModel] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(getDeliveries(token))
      dispatch(getDrivers(token))
      dispatch(getVehicles(token))
    }
  }, [token])

  useEffect(() => {
    setDeliveryState(deliveries)
  }, [deliveries])

  const navigateToDelivery = (obj) => {
    dispatch(setDelivery(obj))
    history.push(`/deliveries/${obj.id}`)
  }

  const toggleModal = () => {
    setFilterModel(state => !state)
  }

  const renderRows = () => {
    return deliveries.map(function (obj, id) {
      return (
        <tr key={id}>
          <td>{obj.id}</td>
          <td>{configData.STATUS[obj.status]}</td>
          <td>{obj.recipient}</td>
          <td>{obj.seller === null ? 'N/A' : obj.seller}</td>
          <td>{obj.driver === null ? 'N/A' : obj.driver.name}</td>
          <td>{obj.deliveryDate === null ? 'N/A' : format(new Date(obj.deliveryDate), 'MMMM Do, yyyy')}</td>
          <td>{obj.deliveryAddress.streetName} {obj.deliveryAddress.houseNumber}</td>
          <td>{obj.pickupAddress.streetName} {obj.pickupAddress.houseNumber}</td>
          <td onClick={() => navigateToDelivery(obj)} className='clickable'><BsPencilSquare size='1.5em' /></td>
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
              Sendingar dagsetning
            </th>
            <th>
              Heimilisfang móttakanda
            </th>
            <th>
              Heimilisfang sendanda
            </th>
            <th onClick={toggleModal} className='clickable'>
              {/* Edit pen icon */}
              <BsFunnel size='2em' color='white' />
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
      <DeliveryFilterModal visible={filterModal} deliveries={deliveries} setDeliveries={setDeliveryState} updateModalState={toggleModal} />
    </div>
  )
}

export default Deliveries
