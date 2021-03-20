import './styles/navbar.css'
import './styles/main.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Users from './views/Users'
import Deliveries from './views/Deliveries'
import Container from './components/Container'
import React, { useEffect } from 'react'
import Login from './components/Login'
import Delivery from './components/Delivery'
import useToken from './hooks/useToken'
import useEmail from './hooks/useEmail'
// import Navbar from './components/Navbar'
import CreateUserForm from './views/CreateUserForm'
import NotFound from './views/NotFound'
import UpdatePasswordForm from './views/UpdatePasswordForm'
import { getUser } from './actions/userActions'

const App = ({ user, getUser }) => {
  const { token, setToken } = useToken()
  const { email, setEmail } = useEmail()

  useEffect(() => {
    if(email){
      console.log(email)
      getUser(email)
    }
  }, [email])
  
  if (!token) {
    return <Login setToken={setToken} setEmail={setEmail} />
  }
  if (user && user.changePassword) {
    return <UpdatePasswordForm />
  }
  console.log("User in app", user)
  return (
    <div className='App'>
      <BrowserRouter>
        <Container>
          <Switch>
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

export default connect(mapStateToProps, { getUser })(App)
