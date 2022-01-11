import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import loginService from './services/login'
import BlogForm from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { login } from './reducers/userReducer'
import {
  Link,
  Switch,
  Route,
  useRouteMatch} from 'react-router-dom'
import Menu from './components/Menu'
import UserInfo from './components/UserInfo'
import User from './components/User'
import Table from 'react-bootstrap/Table'
import Logout from './components/Logout'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => {
    let blogsCopy = state.blogs
    return blogsCopy.sort((blogA, blogB) => blogA.likes < blogB.likes)
  })
  const user = useSelector(state => state.user)
  const stats = useSelector(state => state.stats)
  const blogFormRef = useRef()
  const usersRouteMatch = useRouteMatch('/users/:id')
  const blogsRouteMatch = useRouteMatch('/blogs/:id')
  const userMatch = usersRouteMatch 
    ? stats.find(el => el.user.id === usersRouteMatch.params.id) 
    : null
  const blogMatch = blogsRouteMatch
    ? blogs.find(blog => blog.id === blogsRouteMatch.params.id)
    : null

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
      <div className='container' id='bg'>
        <Menu />
        {user
        ? <strong><em>{user.username} logged in <Logout /></em></strong>
        : <Link to="/login">login</Link>}

        <Notification />
        <Switch>
          <Route path='/users/:id'>
            <User data={userMatch}/>
          </Route>
          <Route path='/users'>
            <UserInfo />
          </Route>
          <Route path='/blogs/:id'>
            <Blog blog={blogMatch}/>
          </Route>
          <Route path='/'>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm toggleVisibility={toggleVisibility}/>
            </Togglable>
              <Table striped bordered variant="dark">
                <tbody>
                  {blogs.map(blog =>
                  <tr key={blog.id} >
                    <td><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></td>
                  </tr>)}
                </tbody>
              </Table>
          </Route>
        </Switch>
      </div>
    
  )
}

export default App 