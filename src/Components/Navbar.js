import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/meet">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/meet">Meet & Greet</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                            Logout
                </a>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
            </li>
        </ul>
      )
        return(
            <nav className="navbar navbar-expand-lg  navbar-light bg-light">
                <Link className="navbar-brand" to="/">WorldWide Students</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));