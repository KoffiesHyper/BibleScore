import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Register from './Pages/Register/Register';
import Read from './Pages/Read/Read';
import Memorize from './Pages/Memorize/Memorize';
import NavBar from './Components/NavBar/NavBar';
import Search from './Pages/Search/Search';
import Login from './Pages/Login/Login';
import { useEffect, useState } from 'react';

function App() {  
  const [user, setUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);

  return (
    <Router>
      <NavBar user={user} signedIn={signedIn} />
      <Route exact path='/' render={() => {
        return (
          <div>
            <HomePage />
          </div>
        );
      }} />

      <Route exact path={'/memorize'} render={() => {
        return (
          <div>
            <Memorize s={0} />
          </div>
        );
      }} />

      <Route exact path={'/memorize/:value'} render={() => {
        return (
          <div>
            <Memorize s={1} />
          </div>
        );
      }} />


      <Route exact path={'/dashboard'} render={() => {
        return (
          <div>
            <Dashboard />
          </div>
        );
      }} />

      <Route exact path={'/register'} render={() => {
        return (
          <div>
            <Register updateUser={(user) => {
              setUser(user);
              setSignedIn(true);
            }} />
          </div>
        );
      }} />

      <Route exact path={'/login'} render={() => {
        return (
          <div>
            <Login />
          </div>
        );
      }} />

      <Route exact path={'/read'} render={() => {
        return (
          <div>
            <Read />
          </div>
        );
      }} />

      <Route exact path={'/search/:keyword'} render={() => {
        return (
          <div>
            <Search />
          </div>
        );
      }} />
    </Router>
  );
}

export default App;
