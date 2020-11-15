import './App.css';
import Persons from './components/Persons';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Explanation from './components/Explanation';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/graphs/:offset/:size'>
            <SideBar>
              <Dashboard />
            </SideBar>
          </Route>
          <Route path='/graphs'>
            <SideBar>
              <Dashboard />
            </SideBar>
          </Route>
          <Route path='/persons/:offset/:size'>
            <SideBar>
              <Persons />
            </SideBar>
          </Route>
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
          <Route exact path='/'>
            <SideBar>
              <Explanation />
            </SideBar>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
