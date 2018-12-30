import React from 'react'
import axios  from 'axios'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress';
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
      username: '', // username input from user
      email: '', // email input from user
      password: '', // password input from user
      passwordVerif: '', // password verify input from user
      firstAlert:'',// alert in case first name input is invalid
      firstClass: 'alertInvis',// class of the alert(if it's alertInvis the alert won't show)
      lastAlert:'',// alert in case last name input is invalid
      lastClass: 'alertInvis',// class of the alert(if it's alertInvis the alert won't show)
      usernameAlert:'',// alert in case username input is invalid
      usernameClass: 'alertInvis',// class of the alert(if it's alertInvis the alert won't show)
      emailAlert:'', // alert in case email input is invalid
      emailClass: 'alertInvis', // class of the alert(if it's alertInvis the alert won't show)
      passwordAlert:'',// alert in case password input is invalid
      passwordClass: 'alertInvis',// class of the alert(if it's alertInvis the alert won't show)
      passwordVerifAlert:'',  // alert in case passwordVerif input is invalid
      passwordVerifClass: 'alertInvis', // class of the alert(if it's alertInvis the alert won't show)
      barValue: '0',
      barColor: 'primary',
      verifFirst: '0',
      verifLast: '0',
      verifUsername: '0',
      verifEmail: '0',
      verifPassword: '0',
      verifPasswordVerif: '0'
    };

    // Connecting the methods to the state 

    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
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

  // Validates the email

  handleEmail(event) {
    this.setState({email: event.target.value});
    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(event.target.value)){
      this.setState({emailAlert: "Please insert a valid E-mail adress!"})
      this.setState({emailClass: "alertShow"})
    }else{
      this.setState({verifEmail: '1'})
      this.setState({emailClass: "alertInvis"})
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
        this.setState({barValue: '0'})
      }else if(sum === 1){
        this.setState({barValue: '30'})
      }else if(sum === 2 && counter[0] === 1){
        this.setState({verifPassword: '1'})
        this.setState({barValue: '50'});
      }else if(sum === 3 && counter[0] === 1){
        this.setState({barValue: '70'});
      }else if(sum === 4){
        this.setState({barValue: '100'});
      }
  }

  // Verifies if the password verification input is the same as the password TODO FIX PASSWORD NOT COMPARING RIGHT BUG

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
    
  // Sending post request for signup to API using axio

  handleRegister() {
    if(this.state.verifFirst ==='1' && this.state.verifLast ==='1' && this.state.verifUsername ==='1' && this.state.verifEmail  === '1'&& this.state.verifPassword  === '1'&& this.state.verifPasswordVerif =='1'){
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
    }else{
      console.log("Something went wrong oops")
    }
  }
  render() {
    return (
      <form  autoComplete="off">
        <TextField
          id="firstName"
          label="First Name"
          margin="normal"
          variant="outlined"
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
        />
        <div className={this.state.lastClass}>
          <Alert
            intent="danger"
            title={this.state.lastAlert}
          />
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
          <Alert
            intent="danger"
            title={this.state.usernameAlert}
          />
        </div><br/>
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
        />
        <LinearProgress color={this.state.barColor} value={this.state.barValue} variant="determinate"/>
        <br/>
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
          <Alert
            intent="danger"
            title={this.state.passwordVerifAlert}
          />
        </div><br/>
        <Button variant="contained" color="primary" onClick={this.handleRegister}>
          Sign up
        </Button>
      </form>
    );
  }
}


export default withStyles(styles)(Register);
