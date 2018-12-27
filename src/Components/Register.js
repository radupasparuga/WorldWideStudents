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
  handleRegister(firstName, lastName, password, email, username) {
    axios.post('/auth/signup', {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      username: username
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
        /><br/>
        <TextField
          id="lastName"
          label="Last Name"
          margin="normal"
          variant="outlined"
        /><br/>
				<TextField
          id="username"
          label="Username"
          margin="normal"
          variant="outlined"
        /><br/>
				<TextField
          id="email"
          label="E-mail"
          margin="normal"
          variant="outlined"
        /><br/>
				<TextField
          id="password"
          label="Password"
          margin="normal"
          variant="outlined"
        /><br/>
				<TextField
          id="passwordConfirmation"
          label="Password Confirmation"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={this.handleRegister(this.firstName, this.lastName, this.password, this.email, this.username)}>
          Sign up
        </Button>
      </form>
    );
  }
}


export default withStyles(styles)(Register);
