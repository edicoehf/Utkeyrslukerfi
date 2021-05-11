import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setViewingVehicle } from '../../actions/vehiclesActions'
import { BsPencilSquare } from 'react-icons/bs'

const VehicleDetails = ({ vehicle }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const navigateToVehicle = (vehicle) => {
    dispatch(setViewingVehicle(vehicle))
    history.push(`/vehicles/${vehicle.licensePlate}`, { params: vehicle })
  }

  return (
    <tr key={vehicle.id}>
      <td>{vehicle.id}</td>
      <td>{vehicle.licensePlate}</td>
      <td>{Math.round((vehicle.height * vehicle.width * vehicle.length) * 100) / 100 + 'cm'}</td>
      <td>{vehicle.height + 'cm'}</td>
      <td>{vehicle.length + 'cm'}</td>
      <td>{vehicle.width + 'cm'}</td>
      <td onClick={() => navigateToVehicle(vehicle)} className='clickable'><BsPencilSquare size='1.5em' /></td>
    </tr>
  )
}

export default VehicleDetails
