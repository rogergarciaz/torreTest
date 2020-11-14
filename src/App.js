import './App.css';
import CarData from './components/CardData';
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
              <CarData />
            </SideBar>
          </Route>
          <Route path='/graphs'>
            <SideBar>
              <Dashboard />
            </SideBar>
          </Route>
          <Route path='/'>
            <SideBar>
              <CarData />
            </SideBar>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
