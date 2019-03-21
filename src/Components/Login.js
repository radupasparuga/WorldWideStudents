/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authentication'
import classnames from 'classnames'
import TextField from '@material-ui/core/TextField'
import "../style/register.css"
/* eslint-enable */

class Login extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.loginUser(user)
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  render() {
    const {errors} = this.state
    return(
      <div className="whiteBg contact-wrap">
       <h2 style={{color: "#333"}}>Sign in</h2>
        <form onSubmit={ this.handleSubmit } className="contact-form">
          <div className="col-sm-12 form-container">
            <TextField
              type="username"
              label="Username"
              className={classnames('form-control', {
                'is-invalid': errors.username
              })}
              name="username"
              onChange={ this.handleInputChange }
              value={ this.state.username }
            />
            {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
          </div>
          <div className="col-sm-12 form-container">
            <TextField
              type="password"
              label="Password"
              className={classnames('form-control', {
                'is-invalid': errors.password
              })} 
              name="password"
              onChange={ this.handleInputChange }
              value={ this.state.password }
            />
            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
          </div>
          <div className="col-sm-12 form-container">
            <button type="submit"  className="btn btn-primary square-button">
              Sign in User
            </button>
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)