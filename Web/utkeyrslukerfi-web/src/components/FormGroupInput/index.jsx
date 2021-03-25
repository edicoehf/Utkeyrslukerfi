import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useFormContext } from 'react-hook-form'

// Input for forms
const FormGroupInput = ({ groupType, label, fieldType, pattern, minLen, typeOfForm, validate }) => {
  const { register, errors } = useFormContext()

  return (
    <Form.Group as={Row} controlId={`form${typeOfForm}${groupType}`}>
      <Form.Label column sm={3}>
        {label}:
      </Form.Label>
      <Col sm={8}>
        <Form.Control
          name={groupType}
          placeholder={`Sláðu inn: ${label}...`}
          type={fieldType}
          ref={register({
            required: 'Nauðsynlegt er að fylla út í þennan reit.',
            minLength: {
              value: minLen,
              message: `${label} þarf að vera að minnsta kosti ${minLen} að lengd.`
            },
            pattern: {
              value: pattern,
              message: `Vinsamlegast sláðu inn leyfilegt: ${label}.`
            },
            validate: validate
          })}
        />
      </Col>
      <Col sm={4}>
        {errors[groupType] && <p>{errors[groupType].message}</p>}
      </Col>
    </Form.Group>
  )
}

export default FormGroupInput
