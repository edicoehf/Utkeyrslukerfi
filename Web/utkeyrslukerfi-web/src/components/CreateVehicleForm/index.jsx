import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { createVehicle } from '../../actions/vehiclesActions'
import { useDispatch, useSelector } from 'react-redux'
import FormGroupInput from '../FormGroupInput'
import FormGroupButton from '../FormGroupButton'
import '../../styles/user.css'
import { useHistory } from 'react-router-dom'

const CreateVehicleForm = () => {
  const methods = useForm()
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()
  const history = useHistory()

  const submitForm = async (data) => {
    dispatch(createVehicle(token, data))
    history.push('/vehicles')
  }

  return (
    <div className='user'>
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
    </div>
  )
}

export default CreateVehicleForm
