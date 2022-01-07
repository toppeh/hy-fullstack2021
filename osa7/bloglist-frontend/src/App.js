import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import loginService from './services/login'
import Logout from './components/Logout'
import BlogForm from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null) 

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      blogs = blogs.sort((a, b) => a.likes < b.likes )
      setBlogs( blogs )
    })  
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userLogin) => {
    try {      
      const user = await loginService.login(userLogin)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))    
    } catch (exception) {
      dispatch(setNotification(`wrong username or password`, 'error', 5))      
      console.log(exception)
    }  
  }

  const handleLogout = (event) => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('user')
  }

  const handleNewBlog = async (newBlog) => {
    const response = await blogService.addNew(newBlog)
    if (response.status === 201) {
      const data = response.data
      setBlogs(blogs.concat(data))
      dispatch(setNotification(`A new blog \'${data.title}\' by ${data.author} added`, 'notification', 5))
      blogFormRef.current.toggleVisibility()
    }
    
  }

  const handleLikesIncrease = async (blog) => {
    const response = await blogService.increaseLikes(blog)
    if (response.status === 200){
      const newBlogs = blogs.map(b => b.id !== blog.id ? b : {...b, likes: b.likes + 1})
      newBlogs.sort((a, b) => a.likes < b.likes)
      setBlogs(newBlogs)
    }
  }

  const handleDeleteBlog = async (blog) => {
    const response = await blogService.deleteBlog(blog.id)
    if (response.status === 204) {
      const newBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(newBlogs)
    }
  }

  if (user===null){
    return (
      <>
        <Notification />
        <LoginForm handleLogin={handleLogin}/>
      </>)
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <Logout handleLogout={handleLogout} /></p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleSubmit={handleNewBlog}/>
      </Togglable>
      <div id='bloglist'>
        {blogs.map(blog =>
          <Blog key={blog.id}
                blog={blog}
                handleLikes={handleLikesIncrease}
                currentUser={user}
                handleDelete={handleDeleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App 