import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setViewingDelivery } from '../../actions/deliveryActions'
import { BsPencilSquare } from 'react-icons/bs'
import { format } from 'date-fns'
import configData from '../../constants/config.json'

const DeliveryDetails = ({ delivery }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const navigateToDelivery = (delivery) => {
    dispatch(setViewingDelivery(delivery))
    history.push(`/deliveries/${delivery.id}`, { params: delivery })
  }
  return (
    <tr key={delivery.id}>
      <td>{delivery.id}</td>
      <td>{configData.STATUS[delivery.status]}</td>
      <td>{delivery.recipient}</td>
      <td>{delivery.seller === null ? 'N/A' : delivery.seller}</td>
      <td>{delivery.driver === null ? 'N/A' : delivery.driver?.name}</td>
      <td>{delivery.deliveryDate === null ? 'N/A' : format(new Date(delivery.deliveryDate), 'MMMM do, yyyy')}</td>
      <td>{delivery.deliveryAddress.streetName} {delivery.deliveryAddress?.houseNumber}</td>
      <td>{delivery.pickupAddress.streetName} {delivery.pickupAddress?.houseNumber}</td>
      <td onClick={() => navigateToDelivery(delivery)} className='clickable'><BsPencilSquare size='1.5em' /></td>
    </tr>
  )
}

export default DeliveryDetails
