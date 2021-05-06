import React, { useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { updatePassword } from '../../actions/loginActions'
import { useDispatch, useSelector } from 'react-redux'
import FormGroupInput from '../FormGroupInput'
import FormGroupButton from '../FormGroupButton'
import '../../styles/updatepassword.css'

// Update password - when a user logs in for the first time
// or the account was updated in any way the user must update their password
// before continuing
const UpdatePasswordForm = () => {
  const methods = useForm()
  const password = useRef({})
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()

  password.current = methods.watch('password', '') // To make sure passwords are the same

  const submitForm = async (data) => {
    dispatch(updatePassword(token, data.password))
  }

  return (
    <div className="password">
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
        </Form>
      </FormProvider>
    </div>
  )
}

export default UpdatePasswordForm
