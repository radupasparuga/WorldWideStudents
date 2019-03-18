/* eslint-disable */
import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import '../style/home.css'
/* eslint-enable */

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const loggedIn = (
      <Dashboard />
    )
    const guest = (
      <div align = "center">
        <div>
          <h1>World Wide Students</h1>
          <p>Meeting new students has never been easier!</p>
          <p>Join us now!</p>
        </div>
        <div className="col-md-3 col-sm-3 col-xs-6">
          <Link className="btn btn-sm animated-button thar-one" to="/register">Sign Up</Link>
        </div>
        <div className="col-md-3 col-sm-3 col-xs-6">
          <Link className="btn btn-sm animated-button thar-one" to="/login">Sign In</Link>
        </div>
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