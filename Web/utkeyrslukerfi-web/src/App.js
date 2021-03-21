import './styles/navbar.css'
import './styles/main.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import HomePage from './components/HomePage'
import Users from './views/Users'
import Deliveries from './views/Deliveries'
import Container from './components/Container'
import React from 'react'
import Login from './components/Login'
import Delivery from './components/Delivery'
import useToken from './hooks/useToken'
import Navbar from './components/Navbar'
import CreateUserForm from './views/CreateUserForm'
import NotFound from './views/NotFound'
import UpdatePasswordForm from './views/UpdatePasswordForm'

const App = ({ user }) => {
  const { token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken} />
  }
  if (user && user.changePassword) {
    return <UpdatePasswordForm />
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/users' component={Users} />
            <Route exact path='/users/create' component={CreateUserForm} />
            {/* <Route exact path='/users/:id' component={UpdatePasswordForm} /> */}
            <Route exact path='/deliveries' component={Deliveries} />
            <Route exact path='/deliveries/:id' component={Delivery} />
            <Route exact path='*' component={NotFound} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = reduxStoreState => {
  return {
    user: reduxStoreState.user
  }
}

export default connect(mapStateToProps, {})(App)
