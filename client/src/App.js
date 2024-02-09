import { React, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import withContext, { Provider } from './contexts/context';
import Home from './components/Home';
import Title from './components/Title';
import TitlePage from './components/TitlePage';
import Genre from './components/Genre';
import GenrePage from './components/GenrePage';
import Header from './components/Header';
import Results from './components/Results';
import Decades from './components/Decades';
import DecadesPage from './components/DecadesPage';
import Register from './components/Register';
import NotFound from './components/NotFound';
import List from './components/List';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer';
import Cookies from 'js-cookie';

/**************************************************************************************
    WRAPPING COMPONENTS IN CONTEXT
***************************************************************************************/

const HomeWithContext = withContext(Home);
const DecadesWithContext = withContext(Decades);
const GenreWithContext = withContext(Genre);
const TitleWithContext = withContext(Title);
const TitlePageWithContext = withContext(TitlePage);
const GenrePageWithContext = withContext(GenrePage);
const ResultsWithContext = withContext(Results);
const DecadesPageWithContext = withContext(DecadesPage);
const ListWithContext = withContext(List);
const LoginWithContext = withContext(Login);
const LogoutWithContext = withContext(Logout);
const RegisterWithContext = withContext(Register);

function App() {
  /**************************************************************************************
      STATE AND ASYNC FUNCTIONS
  ***************************************************************************************/
  let [user, setUser] = useState('');

  function getData() {
    if (!document.cookie) {
      setUser('');
    } else {
      let logger = Cookies.get('signedIn?');
      if (logger === undefined) {
        return null;
      } else {
        let newLogger = JSON.parse(logger);
        if (newLogger === '') {
          setUser('');
        } else {
          setUser(newLogger);
        }
      }
    }
  }

  useEffect(() => { getData() }, [ setUser ]);

  // used below in the NotFound component
  let url = window.location.pathname;

  /**************************************************************************************
      ROUTING
  ***************************************************************************************/

  return (
    <div id='app_div'>
      {/* passing user state to Header as props */}
      <Header user={user} />
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route
              strict path='/'
              element={
                <HomeWithContext />
              }
            />
            <Route
              path='/titles/:url'
              element={
                <TitleWithContext user={user} />
              }
            />
            <Route
              path='/titles'
              element={
                <TitlePageWithContext />
              }
            />
            <Route
              path='/genres/:url'
              element={
                <GenreWithContext />
              }
            />
            <Route
              path='/genres'
              element={
                <GenrePageWithContext />
              }
            />
            <Route
              path='/results/:url'
              element={
                <ResultsWithContext />
              }
            />
            <Route
              path='/decades'
              element={
                <DecadesPageWithContext
                  decades={
                    [
                      { 'name': 'Classics', 'url': 'classics' },
                      { 'name': '1970s', 'url': '70s' },
                      { 'name': '1980s', 'url': '80s' },
                      { 'name': '1990s', 'url': '90s' },
                      { 'name': '2000s', 'url': '00s' },
                      { 'name': '2010s', 'url': '10s' },
                      { 'name': '2020s', 'url': '20s' }
                    ]
                  }
                />
              }
            />
            <Route
              path='/decades/:url'
              element={
                <DecadesWithContext />
              }
            />
            <Route
              path='/list'
              element={
                <ListWithContext user={user} />
              }
            />
            <Route
              path='/login'
              element={
                <LoginWithContext />
              }
            />
            <Route
              path='/logout'
              element={
                <LogoutWithContext />
              }
            />
            <Route
              path='/register'
              element={
                <RegisterWithContext />
              }
            />
            <Route
              path='*'
              element={
                <div className='py-5 my-5 mx-auto'>
                  <NotFound message={url} />
                </div>
              }
            />
          </Routes>
        </Provider>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
