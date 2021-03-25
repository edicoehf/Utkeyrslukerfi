const errorHandlingService = () => {
  return {
    clearMessages: () => {
      const elErr = document.getElementById('err-msg')
      elErr.classList.add('d-none')
      const elSuccess = document.getElementById('success')
      elSuccess.classList.add('d-none')
    },
    setMessage: async (err, setErrorMessage, setSuccess, success) => {
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
        setSuccess(success)
      }
    }
  }
}

export default errorHandlingService()
