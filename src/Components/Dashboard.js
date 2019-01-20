import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../store';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../actions/authentication';

class Dashboard extends Component {
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
        store.dispatch(getUsers);
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render() {
        let usersObj = this.props.users.users
        let size = Object.keys(usersObj).length
        let divUser = []
        for(let i = 0; i < size; ++i){
            divUser[i] = <div className="container">
                <Link to="/user"><h4>@{usersObj[i].user.username}</h4></Link>
                <p>{usersObj[i].user.firstName} {usersObj[i].user.lastName}</p>
            </div>
        }
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <div>{divUser}</div>
        </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users
})

export default connect(mapStateToProps)(withRouter(Dashboard))