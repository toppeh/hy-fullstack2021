import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, handleLikes, currentUser, handleDelete}) => {
  const [ viewAll, setViewAll ] = useState(false)
  //const [ user, setUser ] = useState({})
  
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
    handleLikes(blog)
  }

  const deleteBlog = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) handleDelete(blog)
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
  
  if (currentUser.username === blog.user.username) {
    console.log("Tämä on soppa");
    return (
      <div style={blogStyle} className='blog'>
          <div>{blog.title} {blog.author} <button onClick={changeView}>hide</button></div>
          <div>{blog.url}</div>
          <div className='likes'>likes {blog.likes} <button className='likeBtn' onClick={addLike}>like</button></div>
          <div>{blog.user.name}</div>
          <button style={buttonStyle} onClick={deleteBlog}>remove</button>
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