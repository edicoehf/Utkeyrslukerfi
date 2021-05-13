import './styles/navbar.css'
import './styles/main.css'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react'
import Authorize from './components/Authorization'
import UpdatePasswordForm from './components/UpdatePasswordForm'
import Container from './components/Container'
import Navbar from './components/Navbar'
import User from './views/User'
import Home from './views/Home'
import UsersList from './views/UsersList'
import DeliveriesList from './views/DeliveriesList'
import Delivery from './views/Delivery'
import Package from './views/Package'
import VehicleList from './views/VehicleList'
import Vehicle from './views/Vehicle'
import CreateVehicle from './views/CreateVehicle'
import CreateUser from './views/CreateUser'
import NotFound from './views/NotFound'

const App = () => {
  const changePassword = useSelector(({ login }) => login.changePassword)

  if (changePassword) {
    return <UpdatePasswordForm />
  }
  return (
    <div className='App'>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path='/' component={Authorize(Home)} />
          <Route exact path='/users' component={Authorize(UsersList)} />
          <Route exact path='/users/create' component={Authorize(CreateUser)} />
          <Route exact path='/users/:id' component={Authorize(User)} />
          <Route exact path='/deliveries' component={Authorize(DeliveriesList)} />
          <Route exact path='/deliveries/:id' component={Authorize(Delivery)} />
          <Route exact path='/deliveries/:delid/packages/:id' component={Authorize(Package)} />
          <Route exact path='/vehicles' component={Authorize(VehicleList)} />
          <Route exact path='/vehicles/create' component={Authorize(CreateVehicle)} />
          <Route exact path='/vehicles/:id' component={Authorize(Vehicle)} />
          <Route exact path='*' component={Authorize(NotFound)} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
