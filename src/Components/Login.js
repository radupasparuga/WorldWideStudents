import React from 'react'
import axios  from 'axios'
import TextField from '@material-ui/core/TextField'
import { Button } from 'semantic-ui-react'

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '', // username input
			password: '' // password input
		}

		// Connecting methods to state

		this.handleUsername = this.handleUsername.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleUsername(event){ // handling the username(adding it to state)
		this.setState({username: event.target.value})
	}

	handlePassword(event){ // handling the password(adding it to state)
		this.setState({password: event.target.value})
	}

	handleLogin(e){
		e.preventDefault()
		axios.post('/auth/login',{
			username: this.state.username,
			password: this.state.password
		}).then((response) =>{
			console.log(response)
		})
		.catch((error) =>{
			console.log(error)
		})
	}

    render() {
        return (
            <div className="container">
              <form>
				<h1>Log in</h1>
				<TextField
            		id="username"
            		label="Username"
            		margin="normal"
            		variant="outlined" 
					value={this.state.value} 
            		onChange={this.handleUsername}
          		/><br/>
				<TextField
            		id="password"
            		label="Password"
            		margin="normal"
            		variant="outlined"
					type="password"
					value={this.state.value} 
            		onChange={this.handlePassword}
          		/><br/>
				<Button color="blue" onClick={this.handleLogin}>
            		Sign up
          		</Button>
				</form>
            </div>
        )
    }
}

export default Login