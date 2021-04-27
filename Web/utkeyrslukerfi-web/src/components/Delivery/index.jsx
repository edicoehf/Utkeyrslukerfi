import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDelivery, setDelivery, updateDelivery } from '../../actions/deliveryActions'
import { getPackages } from '../../actions/packageActions'
import DeliveryAddressModal from '../DeliveryAddressModal'
import PickupAddressModal from '../PickupAddressModal'


const Delivery = () => {
  const packages = useSelector(({ packages }) => packages)
  const delivery = useSelector(({ delivery }) => delivery)
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()

  const { id } = useParams()
  const history = useHistory()


  if (Object.entries(delivery).length === 0) {
    dispatch(getDelivery(token, id))
  }

  useEffect(() => {
    if (token) {
      dispatch(getPackages(token, id))
    }
  }, [token])


  useEffect(() => {
    dispatch(setDelivery(delivery))
  }, [])

  // if (Object.entries(delivery).length === 0) {
  //   dispatch(getDelivery(token, pathId))
  // }


  const navigateToPackage = (obj) => {
    history.push(`/deliveries/${id}/packages/${obj.id}`, { params: obj })
  }

  const { recipient, seller, status } = delivery
  const deliveryAddress = `${delivery.deliveryAddress.streetName}  ${delivery.deliveryAddress.houseNumber}`
  const pickupAddress = `${delivery.pickupAddress.streetName}  ${delivery.pickupAddress.houseNumber}`
  const vehicle = delivery.vehicle.licensePlate
  const driver = delivery.driver.name

  const [editable, setEditable] = useState(true);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);

  const handleChange = (e) => {
    const key = e.target.name
    const newVal = e.target.value
    const tempObj = { ...delivery }
    Object.keys(tempObj).forEach(k => {
      if (k === key) { tempObj[k] = newVal }
    })
    dispatch(setDelivery(tempObj))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(updateDelivery(token, id, delivery))
    console.log('delivery: ', delivery)
  }

  const toggleDeliveryModal = () => {
    setShowDeliveryModal(state => !state)
  }
  const togglePickupModal = () => {
    setShowPickupModal(state => !state)
  }

  return (
    // TODO: make selection list for available options such as driver, vehicle, status etc.
    <div className='row align-items-start border rounded shadow mt-3 pr-2'>
      <div className='col col-md-6'>
        <p>Id: {id}</p>
        <form>
          <div className='row'>
            <label className='mt-3 mx-3'>Recipient</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='recipient' onChange={handleChange} defaultValue={delivery?.recipient} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Status</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='status' onChange={handleChange} defaultValue={delivery?.status} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Seller</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='seller' onChange={handleChange} defaultValue={delivery?.seller} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Driver</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='driver' onChange={e => dispatch(setDelivery({ ...delivery, driver: { ...delivery.driver, name: e.target.value } }))} defaultValue={driver} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>DeliveryAddress</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='deliveryAddress' onClick={toggleDeliveryModal} defaultValue={deliveryAddress} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>PickupAddress</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='pickupAddress' onClick={togglePickupModal} defaultValue={pickupAddress} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Vehicle</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='licensePlate' onChange={e => dispatch(setDelivery({ ...delivery, vehicle: { ...delivery.vehicle, licensePlate: e.target.value } }))} defaultValue={vehicle} />
          </div>
        </form>
      </div>
      <div className='col col-md-6 border mt-2 px-auto pt-1'>
        <p>Packages</p>
        {
          packages.length !== 0 ? <> {
            packages.map(function (obj) {
              return <p key={obj.id} onClick={() => navigateToPackage(obj)}>ID/Barcode: {obj.id}</p>
            })
          } </> : <> <p>No packages found</p></>
        }
      </div>
      <button onClick={() => setEditable(editable => !editable)} className='btn btn-outline-info m-4'>Edit</button>
      <button onClick={(event) => handleSubmit(event)} className='btn btn-success m-4 ml-auto'>Vista</button>
      <DeliveryAddressModal canShow={showDeliveryModal} updateModalState={toggleDeliveryModal} />
      <PickupAddressModal canShow={showPickupModal} updateModalState={togglePickupModal} />
    </div>
  )
}

export default Delivery
