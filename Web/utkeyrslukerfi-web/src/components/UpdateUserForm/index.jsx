import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { updateUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import FormGroupInput from '../FormGroupInput'
import FormGroupDropdown from '../FormGroupDropdown'
import FormGroupButton from '../FormGroupButton'
import errorHandlingService from '../../services/errorHandlingService'

const UpdateUserForm = ({ user, token, updateUser }) => {
  const methods = useForm() // TODO: define the roles and use configuration to add them
  const [errorMessage, setErrorMessage] = useState()
  const [success, setSuccess] = useState()

  useEffect(() => {
    // Keep the user state up to date
    if (user) {
      methods.setValue('name', user.name)
      methods.setValue('email', user.email)
      methods.setValue('role', user.role)
    }
  }, [user])

  const clearMessages = () => {
    const elErr = document.getElementById('err-msg')
    elErr.classList.add('d-none')
    const elSuccess = document.getElementById('success')
    elSuccess.classList.add('d-none')
  }

  const submitForm = async (data) => {
    clearMessages()

    const err = await updateUser(token, user.id, { ...data, changePassword: true })
    errorHandlingService.setMessage(err, setErrorMessage, setSuccess, 'he user was successfully updated!')
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(submitForm)} className='form form-horizontal'>
        <FormGroupInput
          groupType='name'
          label='Nafn'
          fieldType='text'
          pattern={/^[^()[\]{}*&^%$#@!0-9]+$/}
          minLen={2}
        />
        <FormGroupInput
          groupType='email'
          label='Netfang'
          fieldType='text'
          pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
          minLen={2}
        />
        <FormGroupInput
          groupType='password'
          label='Tímabundið lykilorð'
          fieldType='password'
          pattern={/^[^()[\]{}*&^%$#@!]+$/}
          minLen={8}
        />

        <FormGroupDropdown
          groupType='role'
          label='Starf'
          options={
            <>
              <option value='1'>Admin</option>
              <option value='2'>Office</option>
              <option value='3'>Driver</option>
            </>
          }
        />

        <FormGroupButton
          label='Vista'
        />

        <div id='err-msg' className='error-message alert alert-danger d-none'>{errorMessage}</div>
        <div id='success' className='error-message alert alert-success d-none'>{success}</div>
      </Form>
    </FormProvider>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.login.token
  }
}

export default connect(mapStateToProps, { updateUser })(UpdateUserForm)
