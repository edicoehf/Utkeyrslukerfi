import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { updateUser } from '../../actions/userActions'
import { connect } from 'react-redux'

const UpdateUserForm = ({ user, token, updateUser }) => {
  const { register, handleSubmit, errors, setValue } = useForm() // TODO: define the roles and use configuration to add them
  const [errorMessage, setErrorMessage] = useState()
  const [success, setSuccess] = useState()

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('role', user.role)
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
    if (err) {
      if (err?.errors) {
        let msg = ''
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.errors)) {
          msg += `${value}\n`
        }
        const element = document.getElementById('err-msg')
        element.classList.remove('d-none')
        setErrorMessage(msg)
      } else {
        const element = document.getElementById('err-msg')
        element.classList.remove('d-none')
        setErrorMessage('Could not reach the login servers')
      }
    } else {
      const element = document.getElementById('success')
      element.classList.remove('d-none')
      setSuccess('The user was successfully updated!')
    }
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)} className='form form-horizontal'>
      <Form.Group as={Row} controlId='formUpdateUserName'>
        <Form.Label column sm={3}>
          Nafn:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            name='name'
            placeholder='Insert name...'
            type='text'
            ref={register({
              required: 'This field is required.',
              minLength: {
                value: 2,
                message: 'Please insert your name.'
              },
              pattern: {
                value: /^[^()[\]{}*&^%$#@!0-9]+$/,
                message: 'Please insert a valid name.'
              }
            })}
          />
        </Col>
        <Col sm={4}>
          {errors.name && <p>{errors.name.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId='formUpdateUserEmail'>
        <Form.Label column sm={3}>
          Netfang:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            name='email'
            placeholder='Insert email...'
            type='text'
            ref={register({
              required: 'This field is required.',
              minLength: {
                value: 2,
                message: 'Please insert your email address.'
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please insert a valid email address.'
              }
            })}
          />
        </Col>
        <Col sm={4}>
          {errors.email && <p>{errors.email.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId='formUpdateUserPassword'>
        <Form.Label column sm={3}>
          Tímabundið lykilorð:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            name='password'
            placeholder='Insert password...'
            type='password'
            ref={register({
              required: 'This field is required.',
              minLength: {
                value: 2,
                message: 'Please insert your password.'
              },
              pattern: {
                value: /^[^()[\]{}*&^%$#@!]+$/,
                message: 'Please insert a valid password.'
              }
            })}
          />
        </Col>
        <Col sm={4}>
          {errors.password && <p>{errors.password.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId='formUpdateUserRole'>
        <Form.Label column sm={3}>
          Starf:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            as='select'
            custom
            name='role'
            ref={register}
          >
            <option value='0'>Admin</option>
            <option value='1'>Office</option>
            <option value='2'>Driver</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 1, offset: 6 }}>
          <Button type='submit' variant='dark'>
            Submit
          </Button>
        </Col>
      </Form.Group>
      <div id='err-msg' className='error-message alert alert-danger d-none'>{errorMessage}</div>
      <div id='success' className='error-message alert alert-success d-none'>{success}</div>
    </Form>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.login.token
  }
}

export default connect(mapStateToProps, { updateUser })(UpdateUserForm)
