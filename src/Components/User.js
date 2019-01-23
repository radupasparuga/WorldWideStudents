import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../store';
import { withRouter } from 'react-router-dom';
import { userProfile } from '../actions/userProfile';

class User extends Component {
    componentWillReceiveProps(nextProps) {
        if(!nextProps.auth.isAuthenticated) {
            this.props.history.push('/login')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        store.dispatch(userProfile(this.props.username.username));
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render() {
        let userObj = this.props.userData.userData
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h1>{userObj.firstName} {userObj.lastName}</h1>
            <h4 className="text-secondary">@{userObj.username}</h4>
            <h4 className="text-secondary">{userObj.region}, {userObj.country} </h4>
        </div>
        )
    }
}

User.propTypes = {
    auth: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    userData: state.userData,
    username: state.username
})

export default connect(mapStateToProps)(withRouter(User))