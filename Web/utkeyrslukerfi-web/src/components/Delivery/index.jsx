import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDelivery, setDelivery, updateDelivery } from '../../actions/deliveryActions'
import { createAddress } from '../../actions/addressActions'
import { getPackages } from '../../actions/packageActions'
import AddressModal from '../AddressModal'
import { useForm } from 'react-hook-form'


const Delivery = () => {
  const packages = useSelector(({ packages }) => packages)
  const delivery = useSelector(({ delivery }) => delivery)
  const users = useSelector(({ users }) => users)
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()
  const methods = useForm()

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

  useEffect(() => {
    if (delivery) {
      methods.setValue('deliveryAddress', delivery.deliveryAddress.streetName)
      methods.setValue('pickupAddress', delivery.pickupAddress.streetName)
    }
  }, [delivery])


  const navigateToPackage = (obj) => {
    history.push(`/deliveries/${id}/packages/${obj.id}`, { params: obj })
  }

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
    const newDelivery = {
      ...delivery,
      VehicleID: delivery.vehicle.id,
      DriverID: delivery.DriverID
    }
    dispatch(updateDelivery(token, id, newDelivery))
    console.log("deliveryAddress: ", newDelivery)
    dispatch(createAddress(token, newDelivery.deliveryAddress))
    // dispatch(createAddress(token, newDelivery.pickupAddress))
  }

  const toggleDeliveryModal = () => {
    setShowDeliveryModal(state => !state)
  }

  const togglePickupModal = () => {
    setShowPickupModal(state => !state)
  }

  const populateOptions = (options) => {
    return options.map((option, index) => (
      <option key={index} value={option.id} selected={driver === option.name ? true : false} >{option.name}</option>
    ))
  }

  const onDriverChange = (e) => {
    delivery.DriverID = e.target.value
    dispatch(setDelivery(delivery))
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
            {/* <label className='mt-3 mx-3'>Driver</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='driver' onChange={e => dispatch(setDelivery({ ...delivery, driver: { ...delivery.driver, name: e.target.value } }))} defaultValue={driver} /> */}
            <label className='mt-3 mx-3'>Driver</label>
            <select onChange={onDriverChange} className='border-none my-3 ml-auto'>
              {populateOptions(users)}
            </select>
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>DeliveryAddress</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='deliveryAddress' onClick={toggleDeliveryModal} value={deliveryAddress} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>PickupAddress</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='pickupAddress' onClick={togglePickupModal} value={pickupAddress} />
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
      <AddressModal canShow={showDeliveryModal} updateModalState={toggleDeliveryModal} isDelivery={true} />
      <AddressModal canShow={showPickupModal} updateModalState={togglePickupModal} isDelivery={false} />
    </div>
  )
}

export default Delivery
