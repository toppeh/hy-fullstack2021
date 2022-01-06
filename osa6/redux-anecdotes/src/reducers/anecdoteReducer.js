import anecdoteService from '../services/anecdotes'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const afterVoting = await anecdoteService.vote(id)
    return dispatch({
      type: 'VOTE',
      data: id
    })
  }
}

export const addAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(data)
    return dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const iniatilizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type){
    case 'VOTE':
      const id = action.data
      let toVote = state.find(anecdote => anecdote.id === id)
      toVote.votes++
      let newState = state.map(anecdote => anecdote.id === id ? toVote : anecdote)
      newState.sort((a,b) => a.votes < b.votes)
      return newState
    
    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INITIALIZE':
      return action.data

    default:
      return state 
  }
}

export default reducer