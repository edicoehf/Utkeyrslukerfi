import './styles/navbar.css'
import './styles/main.css'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './views/Home'
import Users from './views/Users'
import User from './components/User'
import Deliveries from './views/Deliveries'
import Container from './components/Container'
import React, { useEffect } from 'react'
import Login from './components/Login'
import Delivery from './components/Delivery'
import Navbar from './components/Navbar'
import CreateUserForm from './views/CreateUserForm'
import NotFound from './views/NotFound'
import UpdatePasswordForm from './views/UpdatePasswordForm'
import { getLogin } from './actions/loginActions'

const App = ({ token, changePassword, getLogin }) => {
  useEffect(() => {
    getLogin()
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
          <Route exact path='*' component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    token: reduxStoreState.login.token,
    changePassword: reduxStoreState.login.changePassword
  }
}

export default connect(mapStateToProps, { getLogin })(App)
