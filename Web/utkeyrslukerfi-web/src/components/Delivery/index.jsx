import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDelivery } from '../../actions/deliveryActions'
import { getPackages } from '../../actions/packageActions'


const Delivery = ({ getDelivery, delivery, getPackages, packages, token }) => {
  let pathId = useParams().id
  const [deliveryObj, setDeliveryObj] = useState(delivery);

  useEffect(() => {
    if (token) {
      getPackages(token, { id }.id)
    }
  }, [token])


  if (Object.entries(deliveryObj).length === 0) {
    getDelivery(token, pathId)
  }

  const { id, recipient, seller, status, driver } = deliveryObj
  const driverName = driver.name
  const deliveryAddress = `${deliveryObj.deliveryAddress.streetName}  ${deliveryObj.deliveryAddress.houseNumber}`
  const pickupAddress = `${deliveryObj.pickupAddress.streetName}  ${deliveryObj.pickupAddress.houseNumber}`
  const vehicleNr = deliveryObj.vehicle.licensePlate

  const [editable, setEditable] = useState(true);

  const handleChange = (e) => {
    let key = e.target.name
    let newVal = e.target.value
    let tempObj = { ...delivery }
    Object.keys(tempObj).forEach(k => {
      if (k === key) { tempObj[k] = newVal }
    })
    setDeliveryObj(tempObj)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('deliveryObj: ', deliveryObj)
    // TODO: make the patch request to udpate delivery
  }
  return (
    // TODO: make selection list for available options such as driver, vehicle, status etc.
    <div className='row align-items-start border rounded shadow mt-3 pr-2'>
      <div className='col col-md-6'>
        <p>Id: {id}</p>
        <form>
          <div className='row'>
            <label className='mt-3 mx-3'>Recipient</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='recipient' onChange={handleChange} defaultValue={recipient} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Status</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='status' onChange={handleChange} defaultValue={status} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Seller</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='seller' onChange={handleChange} defaultValue={seller} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Driver</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='driver' onChange={e => setDeliveryObj(state => ({ ...state, driver: { ...state.driver, name: e.target.value } }))} defaultValue={driverName} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>DeliveryAddress</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='deliveryAddress' onChange={handleChange} defaultValue={deliveryAddress} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>PickupAddress</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='pickupAddress' onChange={handleChange} defaultValue={pickupAddress} />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Vehicle</label><input className='border-none my-3 ml-auto' disabled={editable} type='text' name='licensePlate' onChange={e => setDeliveryObj(state => ({ ...state,  vehicle: { ...state.vehicle, licensePlate: e.target.value }}))} defaultValue={vehicleNr} />
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
    packages: reduxStoreState.packages,
    delivery: reduxStoreState.delivery,
    token: reduxStoreState.token
  }
}

export default connect(mapStateToProps, { getPackages, getDelivery})(Delivery)