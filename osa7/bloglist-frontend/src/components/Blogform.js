import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const BlogForm = ({ toggleVisibility }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const dispatch = useDispatch()
  
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

  const createBlog = (event) => {
    event.preventDefault()
    dispatch(addBlog(blog))
    dispatch(setNotification(`A new blog '${blog.title}' by ${blog.author} added`, 'notification', 5))
    toggleVisibility()
    setBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return ( 
    <form onSubmit={createBlog}>
      <div>
        title: <input type='text' value={blog.title} name='title' id='title' onChange={handleChange}/>
      </div>
      <div>
        author: <input type='text' value={blog.author} name='author' id='author' onChange={handleChange}/>
      </div>
      <div>
        url: <input type='text' value={blog.url} name='url' id='url' onChange={handleChange}/>
        </div>
      <Button type='submit'>create</Button>
    </form>
  )
}

export default BlogForm