import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeliveries } from '../../actions/deliveriesActions'
import { getDrivers } from '../../actions/usersActions'
import { getVehicles } from '../../actions/vehiclesActions'
import { BsFunnel } from 'react-icons/bs'
import '../../styles/deliveries.css'
import DeliveryFilterModal from '../../components/DeliveryFilterModal'
import DeliveryDetails from '../../components/DeliveryDetails'

const DeliveriesList = () => {
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
    // eslint-disable-next-line
  }, [token])

  useEffect(() => {
    setDeliveryState(deliveries)
  }, [deliveries])

  const toggleModal = () => {
    setFilterModel(state => !state)
  }

  return (
    <div className='deliveries'>
      <table className='table table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th>ID</th>
            <th>Staða</th>
            <th>Móttakandi</th>
            <th>Sendandi</th>
            <th>Bílstjóri</th>
            <th>Dagsetning Sendingar</th>
            <th>Heimilisfang móttakanda</th>
            <th>Heimilisfang sendanda</th>
            <th onClick={toggleModal} className='clickable'>
              {/* Edit pen icon */}
              <BsFunnel size='2em' color='white' />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            deliveryState.length > 0
              ? deliveryState.map((deliv) => (
                <DeliveryDetails delivery={deliv} />
                ))
              : null
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

export default DeliveriesList
