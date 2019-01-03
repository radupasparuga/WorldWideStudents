import React from "react";
import Home from "./Components/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"
import { Menu } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Menu>
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login/">Login</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register/">Sign up</Link>
          </Menu.Item>
      </Menu>

      <Route path="/" exact component={Home} />
      <Route path="/login/" component={Login} />
      <Route path="/register/" component={Register} />
    </div>
  </Router>
);

export default App;