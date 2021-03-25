import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useFormContext } from 'react-hook-form'

// Dropdown for forms
const FormGroupDropdown = ({ groupType, label, options }) => {
  const { register } = useFormContext()

  return (
    <Form.Group as={Row} controlId={`formUpdateUser${groupType}`}>
      <Form.Label column sm={3}>
        {label}:
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          as='select'
          custom
          name={groupType}
          ref={register}
        >
          {options}
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

export default FormGroupDropdown
