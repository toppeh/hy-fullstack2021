import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useHistory } from "react-router-dom"
import Comments from './Comments'
import { Button } from 'react-bootstrap'

const Blog = ({blog}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()

  const addLike = (event) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      history.push('/')
    }
  }

  if (!blog){
    return null
  }
  
  if (user.username === blog.user.username) {
    return (
      <div className='blog'>
          <h2>{blog.title} by {blog.author} </h2>
          <a href={blog.url}>{blog.url}</a>
          <div className='likes'>{blog.likes} likes<Button className='likeBtn' onClick={addLike}>like</Button></div>
          <div>added by {blog.user.name}</div>
          <Button variant="danger" onClick={removeBlog}>remove</Button>
          <Comments blogId={blog.id}/>
      </div>
    )
  }
  return (
    <div className='blog'>
      <h2>{blog.title} by {blog.author} </h2>
      <a href={blog.url}>{blog.url}</a>
      <div className='likes'>{blog.likes} likes<Button className='likeBtn' onClick={addLike}>like</Button></div>
      <div>added by {blog.user.name}</div>
      <Comments blogId={blog.id}/>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

export default Blog