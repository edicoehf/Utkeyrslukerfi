import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'

// Submit button for forms
const FormGroupButton = ({ label, typeOfForm, func }) => {
  return (
    <Form.Group as={Row} controlId={`form${typeOfForm}Button`}>
      <Col sm={{ span: 1, offset: 6 }}>
        <Button type='submit' variant='dark'>
          {label}
        </Button>
      </Col>
    </Form.Group>
  )
}

FormGroupButton.protoTypes = {
  // Specify label for field
  label: PropTypes.string.isRequired,
  // Specify the type of form, updateUser/createUser/...
  typeOfForm: PropTypes.string.isRequired
}

export default FormGroupButton
