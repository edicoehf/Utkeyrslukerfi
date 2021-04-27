import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { createUser } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import FormGroupInput from '../../components/FormGroupInput'
import FormGroupDropdown from '../../components/FormGroupDropdown'
import FormGroupButton from '../../components/FormGroupButton'
import '../../styles/user.css'

const CreateUserForm = () => {
  const methods = useForm() // TODO: define the roles and use configuration to add them
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()

  const submitForm = async (data) => {
    dispatch(createUser(token, { ...data, changePassword: true }))
  }

  return (
    <div className='user'>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(submitForm)} className='form form-horizontal'>
          <FormGroupInput
            groupType='name'
            label='Nafn'
            fieldType='text'
            pattern={/^[^()[\]{}*&^%$#@!0-9]+$/}
            minLen={2}
            typeOfForm='CreateUser'
          />
          <FormGroupInput
            groupType='email'
            label='Netfang'
            fieldType='text'
            pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
            minLen={2}
            typeOfForm='CreateUser'
          />
          <FormGroupInput
            groupType='password'
            label='Tímabundið lykilorð'
            fieldType='password'
            pattern={/^[^()[\]{}*&^%$#@!]+$/}
            minLen={8}
            typeOfForm='CreateUser'
          />
          <FormGroupDropdown
            groupType='role'
            label='Starf'
            options={
              <>
                <option value='1'>Admin</option>
                <option value='2'>Office</option>
                <option value='3'>Driver</option>
                <option value='4'>Disabled</option>
              </>
            }
            typeOfForm='CreateUser'
          />
          <FormGroupButton
            label='Vista'
            typeOfForm='CreateUser'
          />
        </Form>
      </FormProvider>
    </div>
  )
}

export default CreateUserForm
