import './App.css'
import { Switch, Route } from 'react-router-dom';
import Users from './views/Users';

function App () {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/users' component={ Users }/>
      </Switch>
    </div>
  )
}

export default App
