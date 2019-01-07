import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import Home from "./Components/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <Provider store = { store }>
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Home</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link to="/login/" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register/" className="nav-link">Sign up</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/login/" component={Login} />
        <Route path="/register/" component={Register} />
      </div>
    </Router>
  </Provider>
);

export default App;