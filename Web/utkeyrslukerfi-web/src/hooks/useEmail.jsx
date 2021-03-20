import { useState } from 'react'

const useEmail = () => {
  const getEmail = () => {
    const emailString = localStorage.getItem('email')
    const email = JSON.parse(emailString)
    return email
  }

  const [email, setEmail] = useState(getEmail())

  const saveEmail = userEmail => {
    localStorage.setItem('email', JSON.stringify(email))
    setEmail(userEmail)
  }

  return {
    setEmail: saveEmail,
    email
  }
}

export default useEmail
