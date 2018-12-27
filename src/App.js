import React from "react";
import Home from "./Components/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login/">Login</Link>
          </li>
          <li>
            <Link to="/register/">Register</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/login/" component={Login} />
      <Route path="/register/" component={Register} />
    </div>
  </Router>
);

export default App;