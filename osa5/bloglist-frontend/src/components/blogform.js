import React, { useState } from 'react'

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
      title: <input type='text' value={blog.title} name='title' onChange={handleChange}/>
    </div>
    <div>
      author: <input type='text' value={blog.author} name='author' onChange={handleChange}/>
    </div>
    <div>
      url: <input type='text' value={blog.url} name='url' onChange={handleChange}/>
      </div>
    <button type='submit'>create</button>
  </form>
)
}
export default BlogForm