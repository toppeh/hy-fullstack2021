import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = ({ addAnecdote, setNotification }) => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    /*dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`you added \'${anecdote}\'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)*/
    addAnecdote(anecdote)
    setNotification(`you added \'${anecdote}\'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div> )
}

const ConnectedAnecdoteForm = connect(
  null,
  {
    addAnecdote,
    setNotification
  }
  )(AnecdoteForm)

export default ConnectedAnecdoteForm