import React from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authentication'
import classnames from 'classnames';

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '', // username input
			password: '', // password input
			errors: {}
		}

		// Connecting methods to state

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleInputChange(e) {
		this.setState({
				[e.target.id]: e.target.value
		})
}

	handleLogin(e){ // Login meme
		e.preventDefault();
		const user = {
				username: this.state.username,
				password: this.state.password,
		}
		this.props.loginUser(user);
	}

	componentDidMount() {
				if(this.props.auth.isAuthenticated) {
						this.props.history.push('/');
				}
		}

		componentWillReceiveProps(nextProps) {
				if(nextProps.auth.isAuthenticated) {
						this.props.history.push('/')
				}
				if(nextProps.errors) {
						this.setState({
								errors: nextProps.errors
						});
				}
		}

		render() {
				const {errors} = this.state;
				return (
						<div className="container">
							<form onSubmit={ this.handleLogin}>
								<h1>Log in</h1>
								<div className="form-group">
									<TextField
										id="username"
										label="Username"
										margin="normal"
										variant="outlined" 
										onChange={ this.handleInputChange }
										value={ this.state.username }
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
										onChange={ this.handleInputChange }
										value={ this.state.password }
										className={classnames('form-control form-control-lg', {
												'is-invalid': errors.password
										})}
									/>
									{errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
								</div>
								<br/>
								<div className="form-group">
									<button type="submit" className="btn btn-primary">
										Login
									</button>
								</div>
							</form>
					</div>
				)
		}
}

Login.propTypes = {
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)