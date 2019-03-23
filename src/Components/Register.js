import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../actions/authentication'
import TextField from '@material-ui/core/TextField'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import classnames from 'classnames'
import "../style/register.css"
import bg from '../img/landing.png'

class Register extends Component {

  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      country: '',
      region: '',
      password: '',
      password_confirm: '',
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

  selectCountry (val) {
    this.setState({ country: val })
  }
     
  selectRegion (val) {
    this.setState({ region: val })
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      country: this.state.country,
      region: this.state.region,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    }
    this.props.registerUser(user, this.props.history)
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
    const { errors, country, region } = this.state
    return(
      <div style={{ width: "100%", height: "100%", margin: "0" }}>
        <img src={bg} className="bgImg" />
        <div className="whiteBg contact-wrap">
          <h2 style={{ color: "#333" }}>Registration</h2>
          <form onSubmit={this.handleSubmit} className="contact-form">
            <div className="col-sm-6 form-container">
              <TextField
                type="text"
                label="First Name"
                className={classnames('form-control', {
                  'is-invalid': errors.firstName
                })}
                name="firstName"
                onChange={this.handleInputChange}
                value={this.state.firstName}
                margin="normal"
              />
              {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
            </div>
            <div className="col-sm-6 form-container">
              <TextField
                type="text"
                label="Last Name"
                className={classnames('form-control', {
                  'is-invalid': errors.lastName
                })}
                name="lastName"
                onChange={this.handleInputChange}
                value={this.state.lastName}
              />
              {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
            </div>
            <div className="col-sm-12 form-container">
              <TextField
                type="username"
                label="Username"
                className={classnames('form-control', {
                  'is-invalid': errors.username
                })}
                name="username"
                onChange={this.handleInputChange}
                value={this.state.username}
              />
              {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
            </div>
            <div className="col-sm-6 form-container">
              <CountryDropdown
                className={classnames('form-control', {
                  'is-invalid': errors.country
                })}
                value={country}
                onChange={(val) => this.selectCountry(val)}
              />
              {errors.country && (<div className="invalid-feedback">{errors.country}</div>)}
            </div>
            <div className="col-sm-6 form-container">
              <RegionDropdown
                className={classnames('form-control', {
                  'is-invalid': errors.region
                })}
                country={country}
                value={region}
                onChange={(val) => this.selectRegion(val)}
              />
              {errors.region && (<div className="invalid-feedback">{errors.region}</div>)}
            </div>
            <div className="col-sm-12 form-container">
              <TextField
                type="password"
                label="Password"
                className={classnames('form-control', {
                  'is-invalid': errors.password
                })}
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
            <div className="col-sm-12 form-container">
              <TextField
                type="password"
                label="Confirm Password"
                className={classnames('form-control', {
                  'is-invalid': errors.password_confirm
                })}
                name="password_confirm"
                onChange={this.handleInputChange}
                value={this.state.password_confirm}
              />
              {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
            </div>
            <div className="col-sm-12 form-container">
              <button type="submit" className="btn btn-primary square-button">
                Sign up
            </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))