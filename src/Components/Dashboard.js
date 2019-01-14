import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render() {
        store.dispatch(getUsers);
        console.log(this.props)
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h1>Hello</h1>
        </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Dashboard))