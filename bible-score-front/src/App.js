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
import JWTManager from './Components/JWT/JWT';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Account from './Pages/Account/Account';

function App() {
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(async () => {
    const manager = new JWTManager()
    const valid = await manager.testPair();
    if (valid) {
      setSignedIn(true)
    }
  }, [])

  useEffect(async () => {
    if (signedIn) {
      const id = jwt_decode(localStorage.getItem('accessToken')).user_id;

      const user = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`, {
        headers: {
          'Api-Key': process.env.REACT_APP_SERVER_API_KEY,

        }
      })
      setUser(user.data)
    }
  }, [signedIn])

  const saveVerse = async (verse) => {
    var highlighted = user.saved_verses;

    if (!highlighted) highlighted = [verse]
    else highlighted.push(verse)

    const updatedUser = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/${user.id}/`, JSON.stringify({
      username: user.username,
      password: user.password,
      email: user.email,
      saved_verses: highlighted
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': process.env.REACT_APP_SERVER_API_KEY,
      }
    });

    setUser(updatedUser.data);
  }

  return (
    <Router>
      <NavBar user={user} signedIn={signedIn} logOut={() => {
        setUser('');
        setSignedIn(false);
        localStorage.clear();
      }} />
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
            <Register updateSignedIn={(b) => setSignedIn(b)} />
          </div>
        );
      }} />

      <Route exact path={'/login'} render={() => {
        return (
          <div>
            <Login
              updateSignedIn={(b) => setSignedIn(b)}
            />
          </div>
        );
      }} />

      <Route exact path={'/account-details'} render={() => {
        return (
          <div>
            <Account />
          </div>
        );
      }} />

      <Route exact path={'/read'} render={() => {
        return (
          <div>
            <Read user={user} saveVerse={saveVerse} />
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
