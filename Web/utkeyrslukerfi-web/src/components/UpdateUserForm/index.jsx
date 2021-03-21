import React from 'react'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { updateUser } from '../../actions/userActions'
import { connect } from 'react-redux'

const UpdateUserForm = ({ user, token, updateUser }) => {
  const { register, handleSubmit, errors } = useForm() // TODO: define the roles and use configuration to add them

  const submitForm = (data) => {
    console.log('The form was successfully submitted!')
    updateUser(token, user.id, { ...data, changePassword: true })
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
            defaultValue={user.name}
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
            defaultValue={user.email}
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
            defaultValue={user.role}
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
    </Form>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.token
  }
}

export default connect(mapStateToProps, { updateUser })(UpdateUserForm)
