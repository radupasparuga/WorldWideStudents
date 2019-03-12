import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class User extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      country: '',
      region: '',
      posts: '',
    }
    this.getUsernameDetails = this.getUsernameDetails.bind(this)
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

  getUsernameDetails(username) {
    axios.get('/api/getUser/' + username)
      .then(res =>{
        this.setState({ 
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          username: res.data.username,
          country: res.data.country,
          region: res.data.region,
          posts: res.data.posts
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getUsernameDetails(this.props.match.params.username)
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  render() {
    let size = Object.keys(this.state.posts).length
    let divPost = []
    for(let i = 0; i < size; ++i){
      divPost[i] = 
        <div className="container">
          <p>{this.state.posts[i]}</p>
        </div>
    }
    return(
      <div className="container" style={{ marginTop: '50px', width: '700px'}}>
        <h1>{this.state.firstName} {this.state.lastName}</h1>
        <h4 className="text-secondary">@{this.state.username}</h4>
        <h4 className="text-secondary">{this.state.region}, {this.state.country} </h4>
        <div className="col-sm-6 col-md-10">{divPost}</div>
      </div>
    )
  }
}

User.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withRouter(User))