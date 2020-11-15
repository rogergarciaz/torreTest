import './App.css';
import Persons from './components/Persons';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/persons'>
            <SideBar>
              <Persons />
            </SideBar>
          </Route>
          <Route path='/profile/:username'>
            <SideBar>
              <Profile />
            </SideBar>
          </Route>
          <Route path='/graphs'>
            <SideBar>
              <Dashboard />
            </SideBar>
          </Route>
          <Route path='/'>
            <SideBar>
              <Persons />
            </SideBar>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
