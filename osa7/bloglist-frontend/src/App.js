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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory } from 'react-router-dom'
import Menu from './components/Menu'
import UserInfo from './components/UserInfo'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => {
    let blogsCopy = state.blogs
    return blogsCopy.sort((blogA, blogB) => blogA.likes < blogB.likes)
  })
  const user = useSelector(state => state.user)
  const stats = useSelector(state => state.stats)
  const blogFormRef = useRef()
  const match = useRouteMatch('/users/:id')
  console.log('MATCH:', match);
  const userMatch = match 
    ? stats.find(el => el.user.id === match.params.id) 
    : null
  console.log("USER_MATCH:", userMatch);

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user'))
    dispatch(login(storedUser))

    dispatch(initBlogs())
  }, [dispatch])

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

  const toggleVisibility = async () => {
    blogFormRef.current.toggleVisibility()
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
        <Menu />
        <Switch>
          <Route path='/users/:id'>
            <User data={userMatch}/>
          </Route>
          <Route path='/users'>
            <UserInfo />
          </Route>
          <Route path='/'>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm toggleVisibility={toggleVisibility}/>
            </Togglable>
            <div id='bloglist'>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>)
              }
            </div>
          </Route>
        </Switch>
      </div>
    
  )
}

export default App 