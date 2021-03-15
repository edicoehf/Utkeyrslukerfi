import './styles/navbar.css';
import './styles/main.css';
import { Switch, Route } from 'react-router-dom'
import Users from './views/Users'
import Deliveries from './views/Deliveries'
import Navbar from './components/Navbar';
import Container from './components/Container';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path='/users' component={Users} />
          <Route exact path='/deliveries' component={Deliveries} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
