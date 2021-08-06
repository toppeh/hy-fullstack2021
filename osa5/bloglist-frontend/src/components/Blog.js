import React, { useEffect, useState } from 'react'

const Blog = ({blog, handleLikes}) => {
  const [ viewAll, setViewAll ] = useState(false)
  const [ user, setUser ] = useState({})

  useEffect(() => {
    setUser(blog.user)
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeView = () => setViewAll(!viewAll)

  const addLike = (event) => {
    handleLikes(blog)
  }

  if (!viewAll){
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={changeView}>view</button>
        </div> 
      </div> 
    )
  }
  
  return (
    <div style={blogStyle}>  
      <div>
        <div>{blog.title} {blog.author} <button onClick={changeView}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={addLike}>like</button></div>
        <div>{user.name}</div>
      </div>
    </div>
  )
  
}

export default Blog