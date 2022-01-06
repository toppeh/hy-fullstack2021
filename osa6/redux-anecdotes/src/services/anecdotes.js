import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdote = {
    content,
    votes: 0 
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const newVotes = {...anecdote.data, votes: anecdote.data.votes+1}
  const afterVoting = await axios.put(`${baseUrl}/${id}`, newVotes)
  return afterVoting.data
}

const anecdoteService = {
  getAll,
  createAnecdote,
  vote
} 
export default anecdoteService 