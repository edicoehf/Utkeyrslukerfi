import './styles/navbar.css'
import './styles/main.css'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
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

const App = ({ user, email, getUser, getLogin }) => {

  useEffect(() => {
    getLogin()
  }, [])

  useEffect(() => {
    if(email){
      getUser(email)
    }
  }, [email])
  
  if (!email || email == '') {
    return <Login />
  }
  console.log(user)
  if (user && true) {
    return <UpdatePasswordForm />
  }
  return (
    <div className='App'>
      <Container>
        <Switch>
          <Route exact path='/users' component={Users} />
          <Route exact path='/users/create' component={CreateUserForm} />
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
    user: reduxStoreState.user,
    email: reduxStoreState.login
  }
}

export default connect(mapStateToProps, { getUser, getLogin })(App)
