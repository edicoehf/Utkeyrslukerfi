import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateDelivery } from '../../actions/deliveryActions'
import { getPackages } from '../../actions/packageActions'
import AddressModal from '../../components/AddressModal'
import '../../styles/deliveryupdateform.css'
// form imports
import Form from 'react-bootstrap/Form'
import FormGroupInput from '../FormGroupInput'
import FormGroupButton from '../FormGroupButton'
import FormGroupDropdown from '../FormGroupDropdown'
import { useForm, FormProvider } from 'react-hook-form'
import configData from '../../constants/config.json'
import PackageList from '../PackagesList'

const UpdateDelivery = ({ delivery }) => {
  const vehicles = useSelector(({ vehicles }) => vehicles)
  const drivers = useSelector(({ users }) => users)
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()
  const methods = useForm()

  const [deliveryAddress, setDeliveryAddress] = useState({})
  const [pickupAddress, setPickupAddress] = useState({})

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (token) {
      dispatch(getPackages(token, id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    console.log(delivery.driver)
    methods.setValue('deliveryAddress', delivery?.deliveryAddress.streetName)
    methods.setValue('pickupAddress', delivery?.pickupAddress.streetName)
    methods.setValue('recipient', delivery?.recipient)
    methods.setValue('status', delivery?.status)
    methods.setValue('seller', delivery?.seller)
    methods.setValue('driverID', delivery?.driver?.id)
    methods.setValue('vehicleID', delivery?.vehicle?.id)
    setDeliveryAddress(delivery?.deliveryAddress)
    setPickupAddress(delivery?.pickupAddress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delivery])

  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [showPickupModal, setShowPickupModal] = useState(false)

  const submitForm = (data) => {
    const newDelivery = {
      ...delivery,
      recipient: data.recipient === '' ? null : data.recipient,
      driver: data.driver === '' ? null : drivers.find((d) => d.id === data.driverID),
      seller: data.seller === '' ? null : data.seller,
      status: data.status === '' ? null : data.status,
      vehicle: data.driverID === '' ? null : vehicles.find((v) => v.id === data.vehicleID)
      // deliveryDate: data.deliveryDate,
    }
    dispatch(updateDelivery(token, id, newDelivery))
    history.push('/deliveries')
  }

  return (
    <div className="delivery-info">
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
            groupType='driverID'
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
          {/* TODO add Form group for this */}
          <div className='form-group row'>
            <label>Heimilisfang Sendanda:</label>
            <div className="col-sm-8">
              <input
                className='form-control'
                type='text'
                name='pickupAddress'
                onClick={() => setShowPickupModal(true)}
                value={delivery?.pickupAddress?.streetName}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label>Heimilisfang Móttakanda:</label>
            <div className="col-sm-8">
              <input
                className='form-control'
                type='text' name='deliveryAddress'
                onClick={() => setShowDeliveryModal(true)}
                value={delivery?.deliveryAddress?.streetName}
                />
            </div>
          </div>
          <FormGroupDropdown
            groupType='vehicleID'
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
        setAddress={setDeliveryAddress}
      />
      <AddressModal
        openModal={showPickupModal}
        setOpenModal={setShowPickupModal}
        address={pickupAddress}
        setAddress={setPickupAddress}
      />
      <PackageList packages={delivery.packages} deliveryID={delivery.id} />
    </div>
  )
}

export default UpdateDelivery
