import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/login'
import loginService from './services/login'
import Logout from './components/logout'
import BlogForm from './components/blogform'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null) 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {      
      const user = await loginService.login({        
        username, password,      
      })
      setUser(user)
      setUsername('')      
      setPassword('')
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

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const toAdd = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    const response = await blogService.addNew(toAdd)
    if (response.status === 201) {
      const data = response.data
      setNotification(`A new blog ${data.title} by ${data.author} added`)
          setTimeout(() => {
              setNotification(null)
          }, 5000)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user===null){
    return (
    <>
    <Notification message={errorMessage} className="error" />
    <LoginForm handleLogin={handleLogin}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  />
    </>)
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} className="notification" />
      <Notification message={errorMessage} className="error" />
      <p>{user.name} logged in <Logout handleLogout={handleLogout} /></p>

      <BlogForm handleSubmit={handleNewBlog}
                title={title} setTitle={setTitle}
                author={author} setAuthor={setAuthor}
                url={url} setUrl={setUrl}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App