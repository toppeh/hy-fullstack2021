import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification, resetNotification } from "../reducers/notificationReducer";
import Filter from './Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {return anecdotes;}
    return anecdotes.filter(a => {
      if (a.content.search(filter) !== -1) {return a}
      return null
    })
  })


  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(setNotification(`you voted \'${anecdotes.find(a => a.id === id).content}\'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
  return ( 
    <div> 
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>)
}

export default AnecdoteList