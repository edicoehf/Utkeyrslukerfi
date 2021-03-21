import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getDelivery } from '../../actions/deliveryActions'

const Delivery = ({ getDelivery, delivery }) => {
  let pathId = window.location.pathname.split('/')[2];
  useEffect(() => {
    if (Object.entries(delivery).length === 0) {
      getDelivery(pathId)
    }
  }, [])
  const { id, recipient, seller, status } = delivery
  const driver = delivery.driver.name
  const deliveryAddress = `${delivery.deliveryAddress.streetName}  ${delivery.deliveryAddress.houseNumber}`
  const pickupAddress = `${delivery.pickupAddress.streetName}  ${delivery.pickupAddress.houseNumber}`
  const vehicle = delivery.vehicle.licensePlate

  const [editable, setEditable] = useState(true);

  const handleSubmit = (event) => {
   // TODO: this has to be modified to update the form, instead of displaying data
    event.preventDefault()
    console.log('delivery updated')
  }
  return (
    // TODO: make selection list for available options such as driver, vehicle, status etc.
    <div className='row align-items-start border rounded shadow mt-3 pr-2'>
      <div className='col col-md-6'>
        <p>Id: {id}</p>
        <form action=''>
          <div className='row'>
            <label className='mt-3 mx-3'>Recipient</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='recipient' defaultValue={recipient} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Status</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='status' defaultValue={status} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Seller</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='seller' defaultValue={seller} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Driver</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='driver' defaultValue={driver} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>DeliveryAddress</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='deliveryAddress' defaultValue={deliveryAddress} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>PickupAddress</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='pickupAddress' defaultValue={pickupAddress} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Vehicle</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='vehicle' defaultValue={vehicle} />
          </div>
        </form>
      </div>
      <div className='col col-md-6 border mt-2 px-auto pt-1'>
        <p>Packages</p>
        {/* TODO: Add packages here */}
      </div>
      <button onClick={() => setEditable(editable => !editable)} className='btn btn-outline-info m-4'>Edit</button>
      <button onClick={(event) => handleSubmit(event)} className='btn btn-success m-4 ml-auto'>Vista</button>
    </div>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    delivery: reduxStoreState.delivery,
  }
}

export default connect(mapStateToProps, { getDelivery })(Delivery)
