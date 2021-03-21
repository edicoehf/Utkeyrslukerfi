import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { updatePassword } from '../../actions/userActions'
import { connect } from 'react-redux'

const UpdatePasswordForm = ({ updatePassword, user, token }) => {
  const { register, handleSubmit, errors, watch } = useForm()
  const password = useRef({})
  password.current = watch('password', '')

  const submitForm = (data) => {
    console.log('The form was successfully submitted!')
    updatePassword(
      token,
      user.id,
      {
        name: user.name,
        email: user.email,
        password: data.password,
        changePassword: false
      })
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)} className='form form-horizontal'>
      <Form.Group as={Row} controlId='formUpdatePasswordPassword'>
        <Form.Label column sm={3}>
          Lykilorð:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            name='password'
            placeholder='Settu inn lykilorð...'
            type='password'
            ref={register({
              required: 'Þú verður að setja inn lykilorð.',
              minLength: {
                value: 8,
                message: 'Lykilorðið verður að vera 8 karakterar.'
              },
              pattern: {
                value: /^[^()[\]{}*&^%$#@!]+$/,
                message: 'Engin sértákn.'
              }
            })}
          />
        </Col>
        <Col sm={4}>
          {errors.password && <p>{errors.password.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId='formUpdatePasswordPasswordRepeat'>
        <Form.Label column sm={3}>
          Endurtekið lykilorð:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            name='password_repeat'
            placeholder='Settu inn lykilorð...'
            type='password'
            ref={register({
              validate: value =>
                value === password.current || 'Lykilorðin eru ekki þau sömu.'
            })}
          />
        </Col>
        <Col sm={4}>
          {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
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
    user: reduxStoreState.user,
    token: reduxStoreState.token
  }
}

export default connect(mapStateToProps, { updatePassword })(UpdatePasswordForm)
