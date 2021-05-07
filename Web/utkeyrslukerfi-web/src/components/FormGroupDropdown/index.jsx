import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'

// Dropdown for forms
const FormGroupDropdown = ({ groupType, label, options, typeOfForm, setState }) => {
  const { register } = useFormContext()

  return (
    <Form.Group as={Row} controlId={`form${typeOfForm}${groupType}`}>
      <Form.Label column sm={3}>
        {label}:
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          as='select'
          custom
          name={groupType}
          ref={register}
          onChange={(event) => setState(event.target.value)}
        >
          {options}
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

FormGroupDropdown.protoTypes = {
  // Specify field name
  groupType: PropTypes.string.isRequired,
  // Specify label for field
  label: PropTypes.string.isRequired,
  // Specify if text, password or other
  options: PropTypes.string.isRequired,
  // Specify the type of form, updateUser/createUser/...
  typeOfForm: PropTypes.string.isRequired
}

export default FormGroupDropdown
