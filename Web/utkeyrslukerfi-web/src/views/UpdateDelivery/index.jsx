import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDelivery, setDelivery, updateDelivery } from '../../actions/deliveryActions'
import { getPackages } from '../../actions/packageActions'
import AddressModal from '../../components/AddressModal'
import { useForm } from 'react-hook-form'

const UpdateDelivery = () => {
  const packages = useSelector(({ packages }) => packages)
  const delivery = useSelector(({ delivery }) => delivery)
  const vehicles = useSelector(({ vehicles }) => vehicles)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    dispatch(setDelivery(delivery))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  useEffect(() => {
    if (delivery) {
      methods.setValue('deliveryAddress', delivery.deliveryAddress.streetName)
      methods.setValue('pickupAddress', delivery.pickupAddress.streetName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delivery])

  const navigateToPackage = (obj) => {
    history.push(`/deliveries/${id}/packages/${obj.id}`, { params: obj })
  }

  const deliveryAddress = `${delivery.deliveryAddress.streetName}  ${delivery.deliveryAddress.houseNumber}`
  const pickupAddress = `${delivery.pickupAddress.streetName}  ${delivery.pickupAddress.houseNumber}`
  const vehicle = delivery.vehicle == null ? 'N/A' : delivery.vehicle.licensePlate
  const driver = delivery.driver == null ? 'N/A' : delivery.driver.name

  const [editable, setEditable] = useState(true)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [showPickupModal, setShowPickupModal] = useState(false)

  const [deliveryAddChanged, setDeliveryAddChanged] = useState(false)
  const [pickupAddChanged, setPickupAddChanged] = useState(false)

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
      // pickup address
      PickupAddressID: pickupAddChanged ? null : delivery.pickupAddress.id,
      PickupAddressHouseNumber: delivery.pickupAddress.houseNumber,
      PickupAddressZipCode: delivery.pickupAddress.zipCode,
      PickupAddressCity: delivery.pickupAddress.city,
      PickupAddressCountry: delivery.pickupAddress.country,
      PickupAddressStreetName: delivery.pickupAddress.streetName,
      // delivery address
      DeliveryAddressID: deliveryAddChanged ? null : delivery.deliveryAddress.id,
      DeliveryAddressHouseNumber: delivery.deliveryAddress.houseNumber,
      DeliveryAddressZipCode: delivery.deliveryAddress.zipCode,
      DeliveryAddressCity: delivery.deliveryAddress.city,
      DeliveryAddressCountry: delivery.deliveryAddress.country,
      DeliveryAddressStreetName: delivery.deliveryAddress.streetName
    }
    console.log(newDelivery)
    dispatch(updateDelivery(token, id, newDelivery))
  }

  const toggleDeliveryModal = () => {
    setShowDeliveryModal(state => !state)
  }

  const togglePickupModal = () => {
    setShowPickupModal(state => !state)
  }

  const populateOptions = (options) => {
    return options.map((option, index) => (
      <option key={index} value={option.id} selected={driver === option.name}>{option.name}</option>
    ))
  }

  const onDriverChange = (e) => {
    delivery.DriverID = e.target.value
    dispatch(setDelivery(delivery))
  }

  const onStatusChange = (e) => {
    delivery.status = e.target.value
    dispatch(setDelivery(delivery))
  }

  const updateAddressesState = (didCh, val) => {
    if (val === 'delivery') {
      setDeliveryAddChanged(true)
    }
    if (val === 'pickup') {
      setPickupAddChanged(true)
    }
  }

  const populateVehicleOptions = (options) => {
    return options.map((option, index) => (
      <option key={index} value={option.id} selected={vehicle === option.licensePlate}>{option.licensePlate}</option>
    ))
  }

  const onVehicleChange = (e) => {
    delivery.VehicleID = e.target.value
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
            <label className='mt-3 mx-3'>Status</label>
            <select onChange={onStatusChange} className='border-none my-3 ml-auto'>
              <option key={-1} value={-1} disabled>--</option>
              <option key={1} value={1} selected={delivery.status === 1}>Í ferli</option>
              <option key={2} value={2} selected={delivery.status === 2}>Á leiðinni</option>
              <option key={3} value={3} selected={delivery.status === 3}>Móttekin</option>
              <option key={4} value={4} selected={delivery.status === 4}>Týnd</option>
            </select>
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Seller</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='seller' onChange={handleChange} defaultValue={delivery?.seller} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Driver</label>
            <select onChange={onDriverChange} className='border-none my-3 ml-auto'>
              <option key={-1} value={-1}>--</option>
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
            <label className='mt-3 mx-3'>Vehicle</label>
            <select onChange={onVehicleChange} className='border-none my-3 ml-auto'>
              <option key={-1} value={-1}>--</option>
              {populateVehicleOptions(vehicles)}
            </select>
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
          }
          </> : <> <p>No packages found</p></>
        }
      </div>
      <button onClick={() => setEditable(editable => !editable)} className='btn btn-outline-info m-4'>Edit</button>
      <button onClick={(event) => handleSubmit(event)} className='btn btn-success m-4 ml-auto'>Vista</button>
      <AddressModal canShow={showDeliveryModal} updateModalState={toggleDeliveryModal} didChange={updateAddressesState} isDelivery />
      <AddressModal canShow={showPickupModal} updateModalState={togglePickupModal} didChange={updateAddressesState} isDelivery={false} />
    </div>
  )
}

export default UpdateDelivery