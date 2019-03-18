/* eslint-disable */
import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
/* eslint-enable */

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const loggedIn = (
      <Dashboard />
    )
    const guest = (
      <div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Sign In</Link>
          </li>
        </ul>
      </div>
    )
    return (
      <div>
        {isAuthenticated ? loggedIn : guest}
      </div>
    )
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
  )(withRouter(Home));