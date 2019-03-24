/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../store'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getUsers } from '../actions/authentication'
import { CountryDropdown} from 'react-country-region-selector'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import '../style/meet.css'
/* eslint-enable */

class Meet extends Component {
  constructor () {
    super()
    this.state = {
      country : ''
    }
    this.selectCountry = this.selectCountry.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  componentDidMount() {
    store.dispatch(getUsers)
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  selectCountry (val) {
    this.setState({ country: val })
  }

  render() {
    let usersObj = this.props.users.users
    let size = Object.keys(usersObj).length
    let divUser = []
    for(let i = 0; i < size; ++i){
      let link = '/users/' + usersObj[i].user.username
      if(this.state.country !== ''){
        if(this.state.country === usersObj[i].user.country){
          divUser[i] = 
            <Card className="userCard">
              <CardContent>
                <Link to={link}><h4>@{usersObj[i].user.username}</h4></Link>
                <Typography gutterBottom variant="h5" component="h2">{usersObj[i].user.firstName} {usersObj[i].user.lastName}</Typography >
              </CardContent>
            </Card>
        }
      }else{
        divUser[i] = 
          <Card className="userCard">
            <CardContent>
              <Link to={link}><h4>@{usersObj[i].user.username}</h4></Link>
              <Typography gutterBottom variant="h5" component="h2">{usersObj[i].user.firstName} {usersObj[i].user.lastName}</Typography >
            </CardContent>
          </Card>
      }
    }
    return(
      <div style={{ marginTop: '50px'}}>
        <div className="row container">
          <div className="col-md-4">
            <h4>Filter</h4>
            <CountryDropdown
              value={this.state.country}
              onChange={(val) => this.selectCountry(val)} 
              className="dropdown"
            />
          </div>
          <div className="col-md-8">{divUser}</div>
        </div>
      </div>
    )
  }
}

Meet.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users
})

export default connect(mapStateToProps)(withRouter(Meet))