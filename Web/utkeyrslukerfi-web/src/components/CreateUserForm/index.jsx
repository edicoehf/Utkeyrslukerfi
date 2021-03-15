import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { createUser } from '../../actions/userActions'
import { connect } from 'react-redux'

const CreateUserForm = ({ createUser }) => {
  // Form fields
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  // Error messages
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [roleError, setRoleError] = useState('')

  const validateForm = () => {
    if (name === '') {
      setNameError('Name is required.')
    }
    if (password === '') {
      setPasswordError('Password is required.')
    }
    if (email === '') {
      setEmailError('Email is required.')
    }
    if (role === '') {
      setEmailError('Role is required.')
    }

    if (nameError === '' && passwordError === '' && emailError === '' && roleError === '') {
      return true
    }
    return false
  }

  const submitForm = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      console.log('The form was not successfully submitted!')
    } else {
      console.log('The form was successfully submitted!')
      createUser({ name, password, email, role })
    }
  }

  return (
    <Form onSubmit={(e) => submitForm(e)} className='form form-horizontal'>
      <Form.Group as={Row} controlId='formCreateUserName'>
        <Form.Label column sm={3} className='text'>
          Name:
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            name='name'
            placeholder='Insert name...'
            type='text'
            value={name}
            onInput={(e) => {
              setName(e.target.value)
              setNameError('')
            }}
          />
        </Col>
        <Col sm={4}>
          <span className='error'>{nameError}</span>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId='formCreateUserPassword'>
        <Form.Label column sm={3} className='text'>
          Password:
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            name='password'
            placeholder='Insert password...'
            type='text'
            value={password}
            onInput={(e) => {
              setPassword(e.target.value)
              setPasswordError('')
            }}
          />
        </Col>
        <Col sm={4}>
          <span className='error'>{passwordError}</span>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId='formCreateUserEmail'>
        <Form.Label column sm={3} className='text'>
          Email:
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            name='email'
            placeholder='Insert email...'
            type='text'
            value={email}
            onInput={(e) => {
              setEmail(e.target.value)
              setEmailError('')
            }}
          />
        </Col>
        <Col sm={4}>
          <span className='error'>{emailError}</span>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId='formCreateUserRole'>
        <Form.Label column sm={3} className='text'>
          Role:
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            name='email'
            placeholder='Insert role...'
            type='text'
            value={role}
            onInput={(e) => {
              setRole(e.target.value)
              setRoleError('')
            }}
          />
        </Col>
        <Col sm={4}>
          <span className='error'>{roleError}</span>
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

export default connect(null, { createUser })(CreateUserForm)
