import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

// Submit button for forms
const FormGroupButton = ({ label, typeOfForm }) => {
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

export default FormGroupButton
