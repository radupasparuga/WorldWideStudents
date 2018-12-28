import React from 'react'
import axios  from 'axios'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Alert } from 'evergreen-ui'
import './Register.css'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '', // first name input from user
      lastName: '', // last name input from user
      email: '', // email input from user
      password: '', // password input from user
      username: '', // username input from user
      emailAlert:'', // alert in case email input is invalid
      emailClass: 'alertInvis', // class of the alert(if it's alertInvis the alert won't show)
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
    };

    // Connecting the methods to the state 

    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  
  // Validates the first name

  handleFirst(event) {
    this.setState({firstName: event.target.value});
    if(this.state.firstName.length < 2){
      this.setState({firstAlert:"Don't leave this field blank!"})
      this.setState({firstClass:"alertShow"})
    }else{
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
      this.setState({lastClass:"alertInvis"})
    }
  }

  // Validates the email

  handleEmail(event) {
    this.setState({email: event.target.value});
    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(event.target.value)){
      this.setState({emailAlert: "Please insert a valid E-mail adress!"})
      this.setState({emailClass: "alertShow"})
    }else{
      this.setState({emailClass: "alertInvis"})
    }
  }

  // Validates the password

  handlePassword(event) {
    this.setState({password: event.target.value});
    let counter = [0,0,0,0];
      if(this.state.password.length > 7){
        counter[0] = 1;
      }
      if(/[A-Z]+/.test(this.state.password)){
        counter[1] = 1;
      }
      if(/[1-9]+/.test(this.state.password)){
        counter[2] = 1;
      }
      if(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.state.password)){
        counter[3] = 1;
      }
      let sum = counter[0] + counter[1] + counter[2] + counter[3];
      if(sum === 0){
        console.log(0);
      }else if(sum === 1){
        console.log(1)
      }else if(sum === 2 && counter[0] === 1){
        console.log(2)
      }else if(sum === 3 && counter[0] === 1){
        console.log(31)
      }else if(sum === 4){
        console.log(4)
      }
  }

  // Validates the username

  handleUsername(event) {
    this.setState({username: event.target.value});
  }

  // Sending post request for signup to API using axio

  handleRegister() {
    axios.post('/auth/signup', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      email: this.state.email,
      username: this.state.username
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <form  autoComplete="off">
        <TextField
          id="firstName"
          label="First Name"
          margin="normal"
          variant="outlined"
          required={true}
          value={this.state.value} 
          onChange={this.handleFirst}
        />
        <div className={this.state.firstClass}>
          <Alert
            intent="danger"
            title={this.state.firstAlert}
          />
        </div>
        <br/>
        <TextField
          id="lastName"
          label="Last Name"
          margin="normal"
          variant="outlined"
          value={this.state.value} 
          onChange={this.handleLast}
        /><br/>
				<TextField
          id="username"
          label="Username"
          margin="normal"
          variant="outlined"
          value={this.state.value} 
          onChange={this.handleUsername}
        /><br/>
				<TextField
          id="email"
          label="E-mail"
          margin="normal"
          variant="outlined"
          type="email"
          value={this.state.value} 
          onChange={this.handleEmail}
        />
        <div className={this.state.emailClass}>
          <Alert
            intent="danger"
            title={this.state.emailAlert}
          />
        </div>
        <br/>
				<TextField
          id="password"
          label="Password"
          margin="normal"
          variant="outlined"
          type="password"
          value={this.state.value} 
          onChange={this.handlePassword}
        /><br/>
				<TextField
          id="passwordConfirmation"
          label="Password Confirmation"
          margin="normal"
          type="password"
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={this.handleRegister}>
          Sign up
        </Button>
      </form>
    );
  }
}


export default withStyles(styles)(Register);
