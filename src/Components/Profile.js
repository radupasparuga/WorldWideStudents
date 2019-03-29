import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import '../style/profile.css'

class Profile extends Component {
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
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  render() {
    const {user} = this.props.auth
    let size = Object.keys(user.posts).length
    let divPost = []
    for(let i = 0; i < size; ++i){
      divPost[i] = 
        <Card className="postCard">
          <p>{user.posts[i]}</p>
        </Card>
    }
    return(
      <Card className="container profileCard" style={{ marginTop: '50px', maxWidth: '700px'}}>
        <h1>{user.firstName} {user.lastName}</h1>
        <h4 className="text-secondary">@{user.username}</h4>
        <h4 className="text-secondary">{user.region}, {user.country} </h4>
        <div className="col-sm-6 col-md-10">{divPost}</div>
      </Card>
    )
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Profile))