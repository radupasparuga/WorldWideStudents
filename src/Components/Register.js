import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../actions/authentication'
import TextField from '@material-ui/core/TextField'
import { Progress } from 'semantic-ui-react'
import classnames from 'classnames';
import './Register.css'

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '', // first name input from user
      lastName: '', // last name input from user
      username: '', // username input from user
      password: '', // password input from user
      passwordVerif: '', // password verify input from user
      barValue: '0',
      barLabel: '',
      barColor: 'red',
      errors: {}
    };

    // Connecting the methods to the state 
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  // Validates the password

  handlePassword(event) {
    this.setState({password: event.target.value});
    let counter = [0,0,0,0];
      if(event.target.value.length > 7){
        counter[0] = 1;
      }
      if(/[A-Z]+/.test(event.target.value)){
        counter[1] = 1;
      }
      if(/[1-9]+/.test(event.target.value)){
        counter[2] = 1;
      }
      if(/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(event.target.value)){
        counter[3] = 1;
      }
      let sum = counter[0] + counter[1] + counter[2] + counter[3];
      if(sum === 0){
        this.setState({barLabel: 'Invalid'})
        this.setState({barValue: '0'})
        this.setState({barColor: 'red'})
      }else if(sum === 1){
        this.setState({barLabel: 'Weak'})
        this.setState({barColor: 'yellow'})
        this.setState({barValue: '30'})
      }else if(sum === 2 && counter[0] === 1){
        this.setState({barLabel: 'Good'})
        this.setState({barColor: 'blue'})
        this.setState({barValue: '50'});
      }else if(sum === 3 && counter[0] === 1){
        this.setState({barColor: 'olive'})
        this.setState({barLabel: 'Strong'})
        this.setState({barValue: '70'});
      }else if(sum === 4){
        this.setState({barLabel: 'Very Strong'})
        this.setState({barColor: 'green'})
        this.setState({barValue: '100'});
      }
  }

  // Handles input change for most inputs

  handleInputChange(e) {
    this.setState({
        [e.target.id]: e.target.value
    })
  }
  // Handles registration via redux

  handleRegister(e) {
    e.preventDefault()
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        password_confirm: this.state.passwordVerif
    }
    this.props.registerUser(user, this.props.history);
  }

  // Giving free errors

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <form  onSubmit={ this.handleRegister }>
        <h1>Sign up</h1>
        <div className="form-group">
          <TextField
            id="firstName"
            label="First Name"
            margin="normal"
            variant="outlined"
            onChange={ this.handleInputChange }
            value={ this.state.firstName }
            className={classnames('form-control form-control-lg', {
              'is-invalid': errors.firstName
            })}
          />
          {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
        </div>
        <br/>
        <div className="form-group">
          <TextField
            id="lastName"
            label="Last Name"
            margin="normal"
            variant="outlined"
            onChange={ this.handleInputChange }
            value={ this.state.value }
            className={classnames('form-control form-control-lg', {
              'is-invalid': errors.lastName
            })}
          />
          {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
        </div>
        <div className="form-group">
        <br/>
				  <TextField
            id="username"
            label="Username"
            margin="normal"
            variant="outlined"
            onChange={ this.handleInputChange }
            value={ this.state.value }
            className={classnames('form-control form-control-lg', {
              'is-invalid': errors.username
            })}
          />
          {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
        </div>
        <br/>
        <div className="form-group">
				  <TextField
            id="password"
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            value={this.state.value} 
            onChange={this.handlePassword}
            className={classnames('form-control form-control-lg', {
              'is-invalid': errors.password
            })}
          />
          {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
          <Progress percent={this.state.barValue} label={this.state.barLabel} size='small' color={this.state.barColor}/>
        </div>
        <div className="form-group">
				  <TextField
            id="passwordVerif"
            label="Password Confirmation"
            margin="normal"
            type="password"
            variant="outlined"
            onChange={ this.handleInputChange }
            value={ this.state.passwordVerif }
            className={classnames('form-control form-control-lg', {
              'is-invalid': errors.password_confirm
            })}
          />
          {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
        </div>
          <br/>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
                Sign up
            </button>
          </div>
          <div className={this.state.registerClass}>
            <p className={this.state.statusClass}>{this.state.registerStatusAlert}</p>
          </div>
        </form>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});


export default connect(mapStateToProps,{ registerUser })(withRouter(Register))
