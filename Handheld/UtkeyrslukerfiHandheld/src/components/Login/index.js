import React from 'react'
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'react-native'
import { setLogin } from '../../actions/loginActions'
import { useDispatch } from 'react-redux'

const Login = () => {
  // TODO: Get list of all users to select from
  // TODO: Dropdown menu of all users
  // TODO: When you login add selected user to current use
  // TODO: Footer/Header, but with no buttons (blue lines)
  // TODO: css
  // {
  //     "email": "jona@gmail.com",
  //     "password": "jona1234"
  // }
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(setLogin('jona@gmail.com', 'jona1234'))
  }

  return (
    <Button
      onPress={handleSubmit}
      title='Log In'
    />
  )
}

export default Login
