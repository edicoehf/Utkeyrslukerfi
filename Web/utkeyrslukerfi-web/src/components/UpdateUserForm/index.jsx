import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { updateUser } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import FormGroupInput from '../FormGroupInput'
import FormGroupDropdown from '../FormGroupDropdown'
import FormGroupButton from '../FormGroupButton'
import configData from '../../constants/config.json'
import { useHistory } from 'react-router'

// Update User - users can be updated by admins
const UpdateUserForm = ({ user }) => {
  const methods = useForm()
  const history = useHistory()
  const token = useSelector(({ login }) => login.token)
  const [userRole, setUserRole] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    // Keep the user state up to date
    if (user) {
      methods.setValue('name', user.name)
      methods.setValue('email', user.email)
      methods.setValue('role', user.role)
      setUserRole(user.role)
    }
    // eslint-disable-next-line
  }, [user])

  const submitForm = (data) => {
    dispatch(updateUser(token, user.id, { ...data, changePassword: true }))
    history.push('/users')
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
          typeOfForm='UpdateUser'
        />
        <FormGroupInput
          groupType='email'
          label='Netfang'
          fieldType='text'
          pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
          minLen={2}
          typeOfForm='UpdateUser'
        />
        <FormGroupDropdown
          groupType='role'
          label='Starf'
          options={
            <>
              {Object.keys(configData.ROLES).map(function (k) {
                return (
                  <option key={k} value={k}>{configData.ROLES[k]}</option>
                )
              })}
            </>
          }
          typeOfForm='UpdateUser'
          setState={setUserRole}
        />
        {/* if the userRole is either driver, or disabled, there is no need for the password */}
        {parseInt(userRole) === 3 || parseInt(userRole) === 4
          ? null
          : <FormGroupInput
              groupType='password'
              label='Tímabundið lykilorð'
              fieldType='password'
              pattern={/^[^()[\]{}*&^%$#@!]+$/}
              minLen={8}
              typeOfForm='UpdateUser'
            />}
        <FormGroupButton
          label='Vista'
          typeOfForm='UpdateUser'
        />
      </Form>
    </FormProvider>
  )
}

export default UpdateUserForm
