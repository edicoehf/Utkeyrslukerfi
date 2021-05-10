import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { updateVehicle } from '../../actions/vehiclesActions'
import { useDispatch, useSelector } from 'react-redux'
import FormGroupInput from '../FormGroupInput'
import FormGroupButton from '../FormGroupButton'
import { useHistory } from 'react-router'

// Update User - users can be updated by admins
const UpdateVehicleForm = ({ vehicle }) => {
  const methods = useForm()
  const history = useHistory()
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()
  
  const submitForm = (data) => {
    dispatch(updateVehicle(token, vehicle.id, data))
    history.push('/vehicles')
  }

  useEffect(() => {
    // Keep the vehicle state up to date
    if (vehicle) {
      methods.setValue('licensePlate', vehicle.licensePlate)
      methods.setValue('length', vehicle.length)
      methods.setValue('width', vehicle.width)
      methods.setValue('height', vehicle.height)
    }
    // eslint-disable-next-line
  }, [vehicle])

  //TODO: Vehicle actions update er patch, tala um það
  //TODO: spurja hvað þetta authorizeroles dæmi er
  return (
      <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(submitForm)} className='form form-horizontal'>
        <FormGroupInput
          groupType='licensePlate'
          label='Númeraplata'
          fieldType='text'
          typeOfForm='UpdateVehicle'
        />
        <FormGroupInput
          groupType='length'
          label='Lengd'
          fieldType='text'
          typeOfForm='UpdateVehicle'
        />
        <FormGroupInput
          groupType='width'
          label='Breidd'
          fieldType='text'
          typeOfForm='UpdateVehicle'
        />
        <FormGroupInput
          groupType='height'
          label='Hæð'
          fieldType='text'
          typeOfForm='UpdateVehicle'
        />
        <FormGroupButton
          label='Vista'
          typeOfForm='UpdateUser'
        />
      </Form>
    </FormProvider>
  )
}

export default UpdateVehicleForm
