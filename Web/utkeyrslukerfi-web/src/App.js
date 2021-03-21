import './styles/navbar.css'
import './styles/main.css'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './views/Home'
import Users from './views/Users'
import Deliveries from './views/Deliveries'
import Container from './components/Container'
import React, { useEffect } from 'react'
import Login from './components/Login'
import Delivery from './components/Delivery'
// import Navbar from './components/Navbar'
import CreateUserForm from './views/CreateUserForm'
import NotFound from './views/NotFound'
import UpdatePasswordForm from './views/UpdatePasswordForm'
import { getUser } from './actions/userActions'
import { getLogin } from './actions/loginActions'

const App = ({ user, email, token, getUser, getLogin }) => {
  useEffect(() => {
    getLogin()
  }, [])

  useEffect(() => {
    if (email && token) {
      getUser(token, email)
    }
  }, [email, token])
  if (!email || email === '') {
    return <Login />
  }
  if (user && user.changePassword) {
    return <UpdatePasswordForm />
  }
  console.log("get here");
  return (
    <div className='App'>
<<<<<<< HEAD
  <BrowserRouter>
    <Container>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/users/create' component={CreateUserForm} />
        <Route exact path='/deliveries' component={Deliveries} />
        <Route exact path='/deliveries/:id' component={Delivery} />
        <Route exact path='*' component={NotFound} />
      </Switch>
    </Container>
  </BrowserRouter>
=======
      <Container>
        <Switch>
          <Route exact path='/users' component={Users} />
          <Route exact path='/users/create' component={CreateUserForm} />
          <Route exact path='/deliveries' component={Deliveries} />
          <Route exact path='/deliveries/:id' component={Delivery} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </Container>
>>>>>>> d86c7a81ec50f324b3e866d852397672b12ecb74
    </div >
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    user: reduxStoreState.user,
    email: reduxStoreState.login,
    token: reduxStoreState.token
  }
}

export default connect(mapStateToProps, { getUser, getLogin })(App)
