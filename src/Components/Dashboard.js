import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handlePost } from '../actions/post'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
/* eslint-enable */

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      post: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      post: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const post = this.state.post
    this.props.handlePost(post, this.props.auth.user.username)
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
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  render() {
    return(
      <div>
        <h4>Post some meme</h4>
        <form onSubmit={ this.handleSubmit }>
          <textarea name="" id="" cols="30" rows="5" onChange={ this.handleInputChange }>
          </textarea>
          <button type="submit" className="btn btn-primary">
                    Create Post
          </button>
        </form>
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  handlePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {handlePost})(withRouter(Dashboard))