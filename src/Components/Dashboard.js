import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handlePost, getPosts } from '../actions/post'
import store from '../store'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import '../style/dashboard.css'
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
    this.props.handlePost(post, this.props.auth.user.username, this.props.history)
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
    store.dispatch(getPosts)
    if(!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }

  }

  render() {
    /*
    TODO DASHBOARD TO SHOW ALL POSTS BY TIME
    
    let postsObj = this.props.posts.allPosts
    let size = Object.keys(postsObj).length
    let divPost = []
    for(let i = 0; i < size; ++i){
      let link = '/getUsers/' + postsObj[i].user.username
      divUser[i] = 
        <div className="container">
          <Link to={link}><h4>@{usersObj[i].user.username}</h4></Link>
          <p>{usersObj[i].user.firstName} {usersObj[i].user.lastName}</p>
        </div>
    } */
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
  posts: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts
})

export default connect(mapStateToProps, {handlePost})(withRouter(Dashboard))