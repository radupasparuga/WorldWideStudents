import React from 'react';
import axios  from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: ''
    };

    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  
  handleFirst(event) {
    this.setState({firstName: event.target.value});
  }
  handleLast(event) {
    this.setState({lastName: event.target.value});
  }
  handleEmail(event) {
    this.setState({email: event.target.value});
  }
  handlePassword(event) {
    this.setState({password: event.target.value});
  }
  handleUsername(event) {
    this.setState({username: event.target.value});
  }

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
          value={this.state.value} 
          onChange={this.handleFirst}
        /><br/>
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
          value={this.state.value} 
          onChange={this.handleEmail}
        /><br/>
				<TextField
          id="password"
          label="Password"
          margin="normal"
          variant="outlined"
          value={this.state.value} 
          onChange={this.handlePassword}
        /><br/>
				<TextField
          id="passwordConfirmation"
          label="Password Confirmation"
          margin="normal"
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
