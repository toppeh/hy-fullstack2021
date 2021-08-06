import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/login'
import loginService from './services/login'
import Logout from './components/logout'
import BlogForm from './components/blogform'
import Notification from './components/notification'
import Togglable from './components/togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      blogs = blogs.sort((a, b) => a.likes < b.likes )
      setBlogs( blogs )
    }
      
    )  
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
      setErrorMessage('wrong username or password')      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)
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
      setNotification(`A new blog ${data.title} by ${data.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()
    }
  }

  const handleLikesIncrease = async (blog) => {
    const response = await blogService.increaseLikes(blog)
    //console.log(response.status);
    console.log("response.data", response.data);
    // päivitä blogs tilaa että likes piirretään uudelleen
    /*const index = blogs.findIndex(b => b.id === blog.id)
    blogs[index].likes = response.data.likes*/
    const newBlogs = blogs.map(b => b.id !== blog.id ? b : {...b, likes: b.likes + 1})
    newBlogs.sort((a, b) => a.likes < b.likes)
    setBlogs(newBlogs)
  }

  if (user===null){
    return (
    <>
    <Notification message={errorMessage} className="error" />
    <LoginForm handleLogin={handleLogin}/>
    </>)
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} className="notification" />
      <Notification message={errorMessage} className="error" />
      <p>{user.name} logged in <Logout handleLogout={handleLogout} /></p>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm handleSubmit={handleNewBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikesIncrease} />
      )}
    </div>
  )
}

export default App