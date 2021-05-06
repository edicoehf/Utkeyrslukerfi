import './styles/navbar.css'
import './styles/main.css'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import UpdatePasswordForm from './components/UpdatePasswordForm'
import Container from './components/Container'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { getLogin } from './actions/loginActions'
import User from './views/User'
import Home from './views/Home'
import UsersList from './views/UsersList'
import DeliveriesList from './views/DeliveriesList'
import Delivery from './views/Delivery'
import Package from './views/Package'
import CreateUser from './views/CreateUser'
import NotFound from './views/NotFound'

const App = () => {
  const token = useSelector(({ login }) => login.token)
  const changePassword = useSelector(({ login }) => login.changePassword)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLogin())
  })

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
          <Route exact path='/users' component={UsersList} />
          <Route exact path='/users/create' component={CreateUser} />
          <Route exact path='/users/:id' component={User} />
          <Route exact path='/deliveries' component={DeliveriesList} />
          <Route exact path='/deliveries/:id' component={Delivery} />
          <Route exact path='/deliveries/:delid/packages/:id' component={Package} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
