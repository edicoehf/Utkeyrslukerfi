import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getViewingDelivery, setViewingDelivery, updateDelivery } from '../../actions/deliveryActions'
import { getPackages } from '../../actions/packageActions'
import AddressModal from '../../components/AddressModal'
// form imports
import Form from 'react-bootstrap/Form'
import FormGroupInput from '../FormGroupInput'
import FormGroupButton from '../FormGroupButton'
import FormGroupDropdown from '../FormGroupDropdown'
import { useForm, FormProvider } from 'react-hook-form'
import configData from '../../constants/config.json'



const UpdateDelivery = () => {
  const packages = useSelector(({ packages }) => packages)
  const delivery = useSelector(({ delivery }) => delivery)
  const vehicles = useSelector(({ vehicles }) => vehicles)
  const drivers = useSelector(({ users }) => users)
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()
  const methods = useForm()

  const [deliveryAddress, setDeliveryAddress] = useState(delivery.deliveryAddress)
  const [pickupAddress, setPickupAddress] = useState(delivery.pickupAddress)

  const { id } = useParams()
  const history = useHistory()

  if (Object.entries(delivery).length === 0) {
    dispatch(getViewingDelivery(token, id))
  }

  useEffect(() => {
    if (token) {
      dispatch(getPackages(token, id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    dispatch(setViewingDelivery(delivery))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  useEffect(() => {
    methods.setValue('deliveryAddress', delivery?.deliveryAddress.streetName)
    methods.setValue('pickupAddress', delivery?.pickupAddress.streetName)
    methods.setValue('recipient', delivery?.recipient)
    methods.setValue('status', delivery?.status)
    methods.setValue('seller', delivery?.seller)
    methods.setValue('driver', delivery?.driver?.id)
    methods.setValue('vehicle', delivery?.vehicle?.id)
    setDeliveryAddress(delivery?.deliveryAddress)
    setPickupAddress(delivery?.pickupAddress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delivery])

  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [showPickupModal, setShowPickupModal] = useState(false)

  const submitForm = (data) => {
    const newDelivery = {
      ...delivery,
      recipient: data.recipient === "" ? null : data.recipient,
      driver: data.driver === "" ? null : data.driver,
      seller: data.seller === "" ? null : data.seller,
      status: data.status === "" ? null : data.status,
      vehicle: data.driverID === "" ? null : data.driver,
      deliveryDate: data.deliveryDate,
      pickupAddress: data.pickupAddress,
    }
    dispatch(updateDelivery(token, id, newDelivery))
    history.push('/deliveries')
  }

  return (
    <div>
    <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(submitForm)} className='form form-horizontal'>
        <FormGroupInput
          groupType='recipient'
          label='Móttakandi'
          fieldType='text'
          typeOfForm='UpdateDelivery'
          required='false'
          />
        <FormGroupDropdown
          groupType='status'
          label='Staða'
          options={
            <>
              {Object.keys(configData.STATUS).map(function (k) {
                return (
                  <option key={k} value={k}>{configData.STATUS[k]}</option>
                )
              })}
            </>
          }
          typeOfForm='UpdateDelivery'
          />
          <FormGroupInput
            groupType='seller'
            label='Seljandi'
            fieldType='text'
            typeOfForm='UpdateDelivery'
            required='false'
          />
          <FormGroupDropdown
            groupType='driver'
            label='Bílstjóri'
            options={
              <>
                {drivers.map(function (driver) {
                  return (
                    <option key={driver.id} value={driver.id}>{driver.name}</option>
                  )
                })}
              </>
            }
            typeOfForm='UpdateDelivery'
          />
          <div className='row'>
            <label className='mt-3 mx-3'>Heimilisfang Sendada</label>
            <input className='border-none my-3 ml-auto'
              type='text'
              name='pickupAddress'
              onClick={() => setShowPickupModal(true)}
              value={delivery.pickupAddress?.streetName}
            />
          </div>
          <div className='row'>
            <label className='mt-3 mx-3'>Heimilisfang Móttakanda</label>
            <input className='border-none my-3 ml-auto'
              type='text' name='deliveryAddress'
              onClick={() => setShowDeliveryModal(true)}
              value={delivery.deliveryAddress?.streetName}
            />
          </div>
          <FormGroupDropdown
            groupType='vehicle'
            label='Bíll'
            options={
              <>
                {vehicles.map(function (v) {
                  return (
                    <option key={v.id} value={v.id}>{v.licensePlate}</option>
                  )
                })}
              </>
            }
            typeOfForm='UpdateDelivery'
          />
          <FormGroupButton
            label='Vista'
            typeOfForm='UpdateDelivery'
          />
      </Form>
    </FormProvider>    
      <AddressModal 
        openModal={showDeliveryModal} 
        setOpenModal={setShowDeliveryModal} 
        address={deliveryAddress} 
        setAddress={setDeliveryAddress}/>
      <AddressModal 
        openModal={showPickupModal} 
        setOpenModal={setShowPickupModal} 
        address={pickupAddress} 
        setAddress={setPickupAddress}/>
    </div>
  )
}

export default UpdateDelivery
