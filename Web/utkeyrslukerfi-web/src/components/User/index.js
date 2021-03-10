import React from 'react'

const User = ({ name, email, role }) => {
  return (
    <>
      <p>{name}</p>
      <p>{email}</p>
      <p>{role}</p>
    </>
  )
}

export default User
