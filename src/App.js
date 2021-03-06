import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { setCurrentUser } from './actions/authentication'

import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Meet from './components/Meet'
import Dashboard from './components/Dashboard'
import User from './components/User'

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path='/' component={Home} />
            <div>
              <Route exact path='/users/:username' component={User} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/meet' component={Meet} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
