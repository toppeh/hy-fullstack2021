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
import { initBlogs, addBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())  
  }, [dispatch])

  
  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user'))
    dispatch(login(storedUser))
  },[dispatch])

  const handleLogin = async (userLogin) => {
    try {      
      const user = await loginService.login(userLogin)
      dispatch(login(user))
    } 
    catch (exception) {
      dispatch(setNotification(`wrong username or password`, 'error', 5))      
      console.log(exception)
    }  
  }

  const handleLogout = (event) => {
    dispatch(logout())
    dispatch(setNotification('logged out', 'notification', 5))
  }

  const handleNewBlog = async (newBlog) => {
    try {
        dispatch(addBlog(newBlog))
        dispatch(setNotification(`A new blog '${newBlog.title}' by ${newBlog.author} added`, 'notification', 5))
        blogFormRef.current.toggleVisibility()
    } catch (e) {
      console.log(e);
    }
  }

  const handleLikesIncrease = async (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch (e) {
      console.log(e);
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      dispatch(deleteBlog(blog.id))
    } catch (e){
      console.log(e);
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