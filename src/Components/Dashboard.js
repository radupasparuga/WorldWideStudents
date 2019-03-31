import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handlePost, getPosts } from '../actions/post'
import { Link } from "react-router-dom"
import store from '../store'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import '../style/dashboard.css'
/* eslint-enable */

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      post: '',
      errors: {}
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
    const { errors } = this.state
    
    let postsObj = this.props.posts.allPosts
    let size = Object.keys(postsObj).length
    let divPost = []
    let j = 0;
    for(let i = size-1; i >= 0; --i){
      let link = '/users/' + postsObj[i].username
      divPost[j++] = 
        <Card className="postCard">
          <Link to={link}><h4>@{postsObj[i].username}</h4></Link>
          <p>{postsObj[i].post} </p>
        </Card>
    } 
    console.log(divPost)
    return(
      <div className="container">
        <h4>Add a post!</h4>
        <form onSubmit={ this.handleSubmit }>
          <textarea name="" id="" cols="30" rows="2" onChange={this.handleInputChange} className={classnames('form-control', {
            'is-invalid': errors.post
          })}></textarea>
          <button type="submit" className="btn postBtn">
            Create Post
          </button>
          {errors.post && (<div className="invalid-feedback">{errors.post}</div>)}
        </form>
        <Card className="container profileCard postsContainer">{divPost}</Card>
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  handlePost: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
  errors: state.errors
})

export default connect(mapStateToProps, {handlePost})(withRouter(Dashboard))