import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { createUser } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import FormGroupInput from '../FormGroupInput'
import FormGroupDropdown from '../FormGroupDropdown'
import FormGroupButton from '../FormGroupButton'
import configData from '../../constants/config.json'
import '../../styles/user.css'
import { useHistory } from "react-router-dom";

const CreateUserForm = () => {
  const methods = useForm()
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()

  let history = useHistory();

  const submitForm = async (data) => {
    dispatch(createUser(token, { ...data, changePassword: true }))
    history.push("/users")
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
                {Object.keys(configData.ROLES).map(function (k) {
                  return (
                    <option key={k} value={k}>{configData.ROLES[k]}</option>
                  )
                })}
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
