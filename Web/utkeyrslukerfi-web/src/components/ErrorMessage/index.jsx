import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// Error message - used to display error messages for multiple forms
const ErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState()
  const error = useSelector(({ message }) => message.error)

  useEffect(() => {
    if (error?.errors) {
      let msg = ''
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(error.errors)) {
        msg += `${value}\n`
      }
      setErrorMessage(msg)
    } else {
      setErrorMessage('Ekki náðist samband við netþjón.')
    }
  })

  return (Object.keys(error).length === 0) ? null : (<div id='err-msg' className='error-message alert alert-danger'>{errorMessage}</div>)
}

export default ErrorMessage
