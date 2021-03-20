import React from 'react'
import { useLocation } from 'react-router-dom'

const Delivery = () => {
  // might need to use getDeliveryById or something similar instead
  const location = useLocation()
  const obj = location.state.params
  const { id, recipient, seller, status } = obj
  const driver = obj.driver.name
  const deliveryAddress = `${obj.deliveryAddress.streetName}  ${obj.deliveryAddress.houseNumber}`
  const pickupAddress = `${obj.pickupAddress.streetName}  ${obj.pickupAddress.houseNumber}`
  const vehicle = obj.vehicle.licensePlate

  const handleSubmit = (event) => {
    // this has to be modified to update the form, instead of displaying data
    event.preventDefault()
    console.log('delivery updated')
  }
  return (
  // TODO: make selection list for available options such as driver, vehicle, status etc.
    <div className='row align-items-start border rounded shadow'>
      <div className='col col-md-6'>
        <p>Id: {id}</p>
        <form action=''>
          <div className='row'>
            <label className='mt-3 mx-3'>Recipient</label><input className='border-none my-3 ml-auto' type='text' name='recipient' defaultValue={recipient} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Status</label><input className='border-none my-3 ml-auto' type='text' name='status' defaultValue={status} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Seller</label><input className='border-none my-3 ml-auto' type='text' name='seller' defaultValue={seller} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Driver</label><input className='border-none my-3 ml-auto' type='text' name='driver' defaultValue={driver} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>DeliveryAddress</label><input className='border-none my-3 ml-auto' type='text' name='deliveryAddress' defaultValue={deliveryAddress} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>PickupAddress</label><input className='border-none my-3 ml-auto' type='text' name='pickupAddress' defaultValue={pickupAddress} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Vehicle</label><input className='border-none my-3 ml-auto' type='text' name='vehicle' defaultValue={vehicle} />
          </div>
        </form>
      </div>
      <div className='col col-md-6 border'>
        <p>Packages</p>
        {/* TODO: Add packages here */}
      </div>
      <button onClick={(event) => handleSubmit(event)} className='btn btn-outline-info m-4 ml-auto'>Vista</button>
    </div>
  )
}

export default Delivery
