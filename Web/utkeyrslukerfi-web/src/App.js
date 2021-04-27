import './styles/navbar.css'
import './styles/main.css'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from './views/Home'
import Users from './views/Users'
import User from './views/User'
import Deliveries from './views/Deliveries'
import Container from './components/Container'
import React, { useEffect } from 'react'
import UpdatePasswordForm from './components/UpdatePasswordForm'
import Login from './components/Login'
import Delivery from './components/Delivery'
import Package from './components/Package'
import Navbar from './components/Navbar'
import CreateUserForm from './views/CreateUserForm'
import NotFound from './views/NotFound'
import { getLogin } from './actions/loginActions'

const App = () => {
  const token = useSelector(({ login }) => login.token)
  const changePassword = useSelector(({ login }) => login.changePassword)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLogin())
  }, [])

  if (!token || token === '') {
    return <Login />
  }
  if (changePassword) {
    return <UpdatePasswordForm />
  }
  return (
    <div className='App'>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/users/create' component={CreateUserForm} />
          <Route exact path='/users/:id' component={User} />
          <Route exact path='/deliveries' component={Deliveries} />
          <Route exact path='/deliveries/:id' component={Delivery} />
          <Route exact path='/deliveries/:delid/packages/:id' component={Package} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
