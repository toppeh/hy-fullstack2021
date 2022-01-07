import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  
  const handleChange = (event) => {
    const newState = {...blog}
    switch ( event.target.name ){
      case 'title':
        newState.title = event.target.value
        break
      case 'author':
        newState.author = event.target.value
        break
      case 'url':
        newState.url = event.target.value
        break
      default: 
        console.log("lol");
    }
    setBlog(newState)
  }

  const addBlog = (event) => {
    event.preventDefault()
    handleSubmit(blog)
    setBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return ( 
    <form onSubmit={addBlog}>
      <div>
        title: <input type='text' value={blog.title} name='title' id='title' onChange={handleChange}/>
      </div>
      <div>
        author: <input type='text' value={blog.author} name='author' id='author' onChange={handleChange}/>
      </div>
      <div>
        url: <input type='text' value={blog.url} name='url' id='url' onChange={handleChange}/>
        </div>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default BlogForm