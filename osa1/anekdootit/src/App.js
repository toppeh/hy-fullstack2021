import React, { useState } from 'react'

const Button = ( {handleClick, text}) => ( <button onClick={handleClick}>{text}</button>)

const Votes = ({amount}) => <p>has {amount} votes</p>

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const randomNumber = () => (setSelected(Math.floor(Math.random()*7)))

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    if (newVotes[selected] > newVotes[mostVotes]) setMostVotes(selected)
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      {anecdotes[selected]}
      <div></div>
      <Votes amount={votes[selected]} />
      <Button text="Vote" handleClick={handleVote} />
      <Button text="Next anecdote" handleClick={randomNumber} />

      <Header text="Anecdote with most votes" />
      {anecdotes[mostVotes]}
      <Votes amount={votes[mostVotes]} />
    </div>
  )
}

export default App
