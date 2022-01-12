import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Birthyear from './components/Birthyear'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const authorQuery = useQuery(ALL_AUTHORS)
  const bookQuery = useQuery(ALL_BOOKS)

  if (authorQuery.loading || bookQuery.loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('birthyear')}>edit author</button>
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

export default App