import './styles/navbar.css'
import './styles/main.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Users from './views/Users'
import Deliveries from './views/Deliveries'
import Container from './components/Container'
import React from 'react'
import Login from './components/Login'
import Delivery from './components/Delivery'
import useToken from './hooks/useToken'
// import Navbar from './components/Navbar'
import CreateUserForm from './views/CreateUserForm'
import NotFound from './views/NotFound'

const App = () => {
  const { token, setToken } = useToken()
  if (!token) {
    return <Login setToken={setToken} />
  }
  console.log("get here");
  return (
    <div className='App'>
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
    </div>
  )
}

export default App
