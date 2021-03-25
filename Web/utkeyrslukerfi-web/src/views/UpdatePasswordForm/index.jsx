import React, { useRef, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { updatePassword } from '../../actions/loginActions'
import { connect } from 'react-redux'
import FormGroupInput from '../../components/FormGroupInput'
import FormGroupButton from '../../components/FormGroupButton'
import errorHandlingService from '../../services/errorHandlingService'

// Update password - when a user logs in for the first time
// or the account was updated in any way the user must update their password
const UpdatePasswordForm = ({ updatePassword, token }) => {
  const methods = useForm()
  const password = useRef({})
  const [errorMessage, setErrorMessage] = useState()

  password.current = methods.watch('password', '') // To make sure passwords are the same

  const submitForm = async (data) => {
    errorHandlingService.clearMessagesErrors()

    const err = await updatePassword(token, data.password)
    errorHandlingService.setMessageNoSuccess(err, setErrorMessage)
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(submitForm)} className='form form-horizontal'>
        <FormGroupInput
          groupType='password'
          label='Lykilorð'
          fieldType='password'
          pattern={/^[^()[\]{}*&^%$#@!]+$/}
          minLen={8}
          typeOfForm='UpdatePassword'
        />
        <FormGroupInput
          groupType='password_repeat'
          label='Endurtekið lykilorð'
          fieldType='password'
          pattern={/^[^()[\]{}*&^%$#@!]+$/}
          minLen={8}
          typeOfForm='UpdatePassword'
          validate={value => value === password.current || 'Lykilorðin eru ekki þau sömu.'}
        />
        <FormGroupButton
          label='Vista'
          typeOfForm='UpdatePassword'
        />
        <div id='err-msg' className='error-message alert alert-danger d-none'>{errorMessage}</div>
      </Form>
    </FormProvider>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.login.token
  }
}

export default connect(mapStateToProps, { updatePassword })(UpdatePasswordForm)
