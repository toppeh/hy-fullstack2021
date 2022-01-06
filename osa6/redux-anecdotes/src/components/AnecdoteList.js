import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification, resetNotification } from "../reducers/notificationReducer";
import Filter from './Filter'
import anecdoteService from "../services/anecdotes";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {return anecdotes;}
    return anecdotes.filter(a => {
      if (a.content.search(filter) !== -1) {return a}
      return null
    })
  })

  const vote = async (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you voted \'${anecdote.content}\'`, 10))
    /*dispatch(setNotification(`you voted \'${anecdotes.find(a => a.id === id).content}\'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)*/
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>)
}

export default AnecdoteList