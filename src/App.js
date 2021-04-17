import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Feed from './Feed.js';
import Widgets from './Widgets.js';
import SearchDweet from './SearchDweet.js';
import Login from './Login';
import Logout from './Logout';
import useToken from './useToken';

/*function App() {
  return (
    <div className="app">

      <Feed />
      <Widgets />
      <SearchDweet />

    </div>
  );
}*/



function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/dwitter">
          <Feed />
          <Widgets />
          <SearchDweet />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;
