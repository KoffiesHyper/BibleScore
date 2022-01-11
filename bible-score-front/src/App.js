import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Register from './Pages/Register/Register';
import Read from './Pages/Read/Read';
import Memorize from './Pages/Memorize/Memorize';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
      <Router>
        <Route exact path='/' render={() => {
          return (
            <div>
              <NavBar />
              <HomePage />
            </div>
          );
        }} />

        <Route exact path={'/memorize'} render={() => {
          return (
            <div>
              <NavBar />
              <Memorize s={0} />
            </div>
          );
        }} />

        <Route exact path={'/memorize/:value'} render={() => {
          return (
            <div>
              <NavBar />
              <Memorize s={1} />
            </div>
          );
        }} />


        <Route exact path={'/dashboard'} render={() => {
          return (
            <div>
              <NavBar />
              <Dashboard />
            </div>
          );
        }} />

        <Route exact path={'/register'} render={() => {
          return (
            <div>
              <NavBar />
              <Register />
            </div>
          );
        }} />

        <Route exact path={'/read'} render={() => {
          return (
            <div>
              <NavBar />
              <Read />
            </div>
          );
        }} />
      </Router>
  );
}

export default App;
