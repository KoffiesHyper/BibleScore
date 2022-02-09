import './App.css';
import {
  BrowserRouter as Router,
  Route,
  useHistory
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
import PassageFinder from './Components/Passage/Passage';
import Brethren from './Pages/Brethren/Brethren';

function App() {
  const [user, setUser] = useState(null);
  const [savedVerses, setSavedVerses] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [keyword, setKeyword] = useState();
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

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

  useEffect(async () => {
    if (user) {
      updateSavedVerses();
      getFriendRequests();
      getFriendList()
    }
  }, [user])

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

  const updateSavedVerses = async () => {
    const verses = [];

    user.saved_verses.forEach(async (e, i) => {
      const splitted = e.split('.');
      let book = splitted[0];
      let chapter = splitted[1];
      let verse = splitted[2];

      const finder = new PassageFinder(book, chapter, verse);
      const text = await finder.getVerse();
      verses.push(text);

      if (i === user.saved_verses.length - 1)
        setTimeout(() => {
          setSavedVerses(verses);
        }, 50);
    });
  }

  const getFriendRequests = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/friends-request/${user.id}`, {
      headers: {
        'Api-Key': process.env.REACT_APP_SERVER_API_KEY
      }
    })

    const requests = response.data;

    var array = [];

    for (let i = 0; i < requests.length; i++) {
      const e = requests[i];
      const response = await getUser(e);

      array.push(response.data)
      if (i === requests.length - 1)
        setTimeout(() => {
          setFriendRequests(array)
        }, 50)
    }

    async function getUser(e) {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${e.from_user}`, {
        headers: {
          'Api-Key': process.env.REACT_APP_SERVER_API_KEY
        }
      })
      return response
    }
  }

  const getFriendList = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/friends-list/${user.id}`, {
      headers: { 
        'Api-Key': process.env.REACT_APP_SERVER_API_KEY
      }
    })

    setFriends(response.data);
  }

  const logOut = () => {
    setUser('');
    setSignedIn(false);
    localStorage.clear();
    setSavedVerses([]);
  }

  return (
    <Router>
      <NavBar user={user} signedIn={signedIn} logOut={logOut} keyword={keyword} updateKW={(e) => {
        setKeyword(e);
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
            <Dashboard user={user} savedVerses={savedVerses} friendRequests={friendRequests} friends={friends} />
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
            <Search keyword={keyword} updateKW={setKeyword} />
          </div>
        );
      }} />

      <Route exact path={'/brethren'} render={() => {
        return (
          <div>
            <Brethren user={user} />
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
            <Account user={user} />
          </div>
        );
      }} />
    </Router>
  );
}

export default App;
