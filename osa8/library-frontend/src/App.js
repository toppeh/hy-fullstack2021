import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Birthyear from './components/Birthyear'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Login from './components/Login'


const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const authorQuery = useQuery(ALL_AUTHORS)
  const bookQuery = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    setUser(window.localStorage.getItem('kirjasto-user-token'))
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem('kirjasto-user-token', token)
    setUser(token)
    setPage('authors')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('kirjasto-user-token')
    client.resetStore()
    setUser(null)
    setPage('authors')
  }

  if (authorQuery.loading || bookQuery.loading){
    return <div>loading...</div>
  }

  if (user){
    return (
      <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('birthyear')}>edit author</button>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'} authors={authorQuery.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={bookQuery.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <Birthyear
        show={page === 'birthyear'} authors={authorQuery.data.allAuthors}
      />
      
    </div>
    )
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors
        show={page === 'authors'} authors={authorQuery.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={bookQuery.data.allBooks}
      />
      <Login show={page === 'login'} loginCallback={handleLogin} />
    </div>
  )
}

export default App