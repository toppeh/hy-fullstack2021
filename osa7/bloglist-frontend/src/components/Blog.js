import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useHistory } from "react-router-dom"
import Comments from './Comments'

const Blog = ({blog}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()

  useEffect(() => {
    //console.log("BLOG:", blog, "CURRENT_USER:", currentUser);
    //setUser({...blog.user})
    //console.log("USER:", user);
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    "backgroundColor": 'lightblue',
  }


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
          <div className='likes'>{blog.likes} likes<button className='likeBtn' onClick={addLike}>like</button></div>
          <div>added by {blog.user.name}</div>
          <button style={buttonStyle} onClick={removeBlog}>remove</button>
          <Comments blogId={blog.id}/>
      </div>
    )
  }
  return (
    <div className='blog'>
      <h2>{blog.title} by {blog.author} </h2>
      <a href={blog.url}>{blog.url}</a>
      <div className='likes'>{blog.likes} likes<button className='likeBtn' onClick={addLike}>like</button></div>
      <div>added by {blog.user.name}</div>
      <Comments blogId={blog.id}/>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

export default Blog