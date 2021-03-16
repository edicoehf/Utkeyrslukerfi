import './styles/navbar.css'
import './styles/main.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Users from './views/Users'
import Deliveries from './views/Deliveries'
import Container from './components/Container'
import React from 'react'
import Login from './components/Login'
import useToken from './hooks/useToken'
// import Navbar from './components/Navbar'
import CreateUserForm from './views/CreateUserForm'
import NotFound from './views/NotFound'

const App = () => {
  const { token, setToken } = useToken()
  console.log(token)
  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <Container>
          <Switch>
            <Route exact path='/users' component={Users} />
            <Route exact path='/users/create' component={CreateUserForm} />
            <Route exact path='/deliveries' component={Deliveries} />
            <Route exact path='*' component={NotFound} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
