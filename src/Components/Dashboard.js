import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../store';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../actions/authentication';
import { sendUsername } from '../actions/userProfile';
import { CountryDropdown} from 'react-country-region-selector';

class Dashboard extends Component {
    constructor () {
        super();
        this.state = {
            country : ''
        }
        this.selectCountry = this.selectCountry.bind(this)
    }
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

    selectCountry (val) {
        this.setState({ country: val });
    }

    // Sends selected username to state to show the profile page
    handleUsername(username) {
        store.dispatch(sendUsername(username));
    }

    render() {
        let usersObj = this.props.users.users
        let size = Object.keys(usersObj).length
        let divUser = []
        for(let i = 0; i < size; ++i){
            if(this.state.country !== ''){
                if(this.state.country === usersObj[i].user.country){
                    divUser[i] = 
                    <div className="container">
                        <Link to="/user" onClick={() => this.handleUsername(usersObj[i].user.username)}><h4>@{usersObj[i].user.username}</h4></Link>
                        <p>{usersObj[i].user.firstName} {usersObj[i].user.lastName}</p>
                    </div>
                }
            }else{
                divUser[i] = 
                <div className="container">
                    <Link to="/user" onClick={() => this.handleUsername(usersObj[i].user.username)}><h4>@{usersObj[i].user.username}</h4></Link>
                    <p>{usersObj[i].user.firstName} {usersObj[i].user.lastName}</p>
                </div>
            }
        }
        return(
        <div style={{ marginTop: '50px'}}>
            <div className="row">
                <div className="col-sm-2">
                    <h4>Filter</h4>
                    <CountryDropdown
                        value={this.state.country}
                        onChange={(val) => this.selectCountry(val)} 
                        className="dropdown"
                    />
                </div>
                <div className="col-sm-6 col-md-10">{divUser}</div>
            </div>
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