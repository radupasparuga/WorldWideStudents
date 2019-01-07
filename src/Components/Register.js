import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../actions/authentication'
import TextField from '@material-ui/core/TextField'
import { Button } from 'semantic-ui-react'
import { Progress } from 'semantic-ui-react'
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
      firstAlert:'',// alert in case first name input is invalid
      firstClass: 'alertInvis',// class of the alert(if it's alertInvis the alert won't show)
      lastAlert:'',// alert in case last name input is invalid
      lastClass: 'alertInvis',// class of the alert(if it's alertInvis the alert won't show)
      usernameAlert:'',// alert in case username input is invalid
      usernameClass: 'alertInvis',// class of the alert(if it's alertInvis the alert won't show)
      passwordAlert:'',// alert in case password input is invalid
      passwordClass: 'alertInvis',// class of the alert(if it's alertInvis the alert won't show)
      passwordVerifAlert:'',  // alert in case passwordVerif input is invalid
      passwordVerifClass: 'alertInvis', // class of the alert(if it's alertInvis the alert won't show)
      barValue: '0',
      barLabel: '',
      barColor: 'red',
      verifFirst: '0',
      verifLast: '0',
      verifUsername: '0',
      verifPassword: '0',
      verifPasswordVerif: '0',
      statusClass: '',
      registerClass: 'alertInvis',
      registerStatusAlert: '',
      errors: {}
    };

    // Connecting the methods to the state 

    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordVerif = this.handlePasswordVerif.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  
  // Validates the first name

  handleFirst(event) {
    this.setState({firstName: event.target.value});
    if(this.state.firstName.length < 2){
      this.setState({firstAlert:"Don't leave this field blank!"})
      this.setState({firstClass:"alertShow"})
    }else{
      this.setState({verifFirst: '1'})
      this.setState({firstClass:"alertInvis"})
    }
  }

  // Validates the last name

  handleLast(event) {
    this.setState({lastName: event.target.value});
    if(this.state.lastName.length < 2){
      this.setState({lastAlert:"Don't leave this field blank!"})
      this.setState({lastClass:"alertShow"})
    }else{
      this.setState({verifLast: '1'})
      this.setState({lastClass:"alertInvis"})
    }
  }

  // Validates the username

  handleUsername(event) {
    this.setState({username: event.target.value});
    if(this.state.username.length < 5){
      this.setState({usernameAlert:"Username must be longer than 5 characters!"})
      this.setState({usernameClass:"alertShow"})
    }else{
      this.setState({verifUsername: '1'})
      this.setState({usernameClass:"alertInvis"})
    }
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
        this.setState({verifPassword: '1'})
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

  // Verifies if the password verification input is the same as the password 

  handlePasswordVerif(event) {
    this.setState({passwordVerif: event.target.value});
    if(event.target.value !== this.state.password){
      this.setState({passwordVerifAlert:"The two passwords must coincide!"})
      this.setState({passwordVerifClass:"alertShow"})
    }else{
      this.setState({passwordVerifClass:"alertInvis"})
      this.setState({verifPasswordVerif: '1'})
    }
  }
    
  // Handles registration via redux

  handleRegister(e) {
    e.preventDefault()
    if(this.state.verifFirst ==='1' && this.state.verifLast ==='1' && this.state.verifUsername ==='1' && this.state.verifPassword  === '1'&& this.state.verifPasswordVerif ==='1'){
      const user = {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        password_confirm: this.state.password_confirm
    }
    this.props.registerUser(user, this.props.history);
    }else{
      this.setState({registerClass: 'alertShow'})
      this.setState({registerStatusAlert: 'Something went wrong oops'})
      this.setState({statusClass: 'alert'})
    }
  }

  // 

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
  }

  render() {
    return (
      <div className="container">
        <form  onSubmit={ this.handleSubmit }>
        <h1>Sign up</h1>
          <TextField
            id="firstName"
            label="First Name"
            margin="normal"
            variant="outlined"
            value={this.state.value} 
            onChange={this.handleFirst}
          />
          <div className={this.state.firstClass}>
            <p className="alert">{this.state.firstAlert}</p>
          </div>
          <br/>
          <TextField
            id="lastName"
            label="Last Name"
            margin="normal"
            variant="outlined"
            value={this.state.value} 
            onChange={this.handleLast}
          />
          <div className={this.state.lastClass}>
            <p className="alert">{this.state.lastAlert}</p>
          </div><br/>
				  <TextField
            id="username"
            label="Username"
            margin="normal"
            variant="outlined"
            value={this.state.value} 
            onChange={this.handleUsername}
          />
          <div className={this.state.usernameClass}>
            <p className="alert">{this.state.usernameAlert}</p>
          </div><br/>
				  <TextField
            id="password"
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            value={this.state.value} 
            onChange={this.handlePassword}
          />
          <Progress percent={this.state.barValue} label={this.state.barLabel} size='small' color={this.state.barColor}/>
				  <TextField
            id="passwordConfirmation"
            label="Password Confirmation"
            margin="normal"
            type="password"
            variant="outlined"
            value={this.state.value} 
            onChange={this.handlePasswordVerif}
          />
          <div className={this.state.passwordVerifClass}>
          <p className="alert">{this.state.passwordVerifAlert}</p>
          </div><br/>
          <Button color="blue" type="submit">
            Sign up
          </Button>
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
