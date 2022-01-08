import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({blog}) => {
  const [ viewAll, setViewAll ] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
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

  const changeView = () => setViewAll(!viewAll)

  const addLike = (event) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  if (!viewAll){
    return (
      <div style={blogStyle} className='blog'>
        <div>
          {blog.title} {blog.author} <button className='viewBtn' onClick={changeView}>view</button>
        </div> 
      </div> 
    )
  }
  
  if (user.username === blog.user.username) {
    return (
      <div style={blogStyle} className='blog'>
          <div>{blog.title} {blog.author} <button onClick={changeView}>hide</button></div>
          <div>{blog.url}</div>
          <div className='likes'>likes {blog.likes} <button className='likeBtn' onClick={addLike}>like</button></div>
          <div>{blog.user.name}</div>
          <button style={buttonStyle} onClick={removeBlog}>remove</button>
      </div>
    )
  }
  return (
    <div style={blogStyle} className='blog'>  
        <div>{blog.title} {blog.author} <button onClick={changeView}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button className='likeBtn' onClick={addLike}>like</button></div>
        <div>{blog.user.name}</div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog