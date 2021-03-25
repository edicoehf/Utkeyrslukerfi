import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { createUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import FormGroupInput from '../../components/FormGroupInput'
import FormGroupDropdown from '../../components/FormGroupDropdown'
import FormGroupButton from '../../components/FormGroupButton'
import errorHandlingService from '../../services/errorHandlingService'
import '../../styles/user.css'

const CreateUserForm = ({ token, createUser }) => {
  const methods = useForm() // TODO: define the roles and use configuration to add them
  const [errorMessage, setErrorMessage] = useState()
  const [success, setSuccess] = useState()

  const submitForm = async (data) => {
    errorHandlingService.clearMessages()

    const err = await createUser(token, { ...data, changePassword: true })
    errorHandlingService.setMessage(err, setErrorMessage, setSuccess, 'Það tókst að búa til notandann!')
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
              </>
            }
            typeOfForm='CreateUser'
          />
          <FormGroupButton
            label='Vista'
            typeOfForm='CreateUser'
          />

          <div id='err-msg' className='error-message alert alert-danger d-none'>{errorMessage}</div>
          <div id='success' className='error-message alert alert-success d-none'>{success}</div>
        </Form>
      </FormProvider>
    </div>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.login.token
  }
}

export default connect(mapStateToProps, { createUser })(CreateUserForm)
