import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const handleClick = () => {
    let random = Math.floor(Math.random() * 5)
    setSelected(random)
  }

  
  const handleVote = () => {
    votes[selected] += 1
    let copyVotes = [...votes]
    setVotes(copyVotes)
  }
  
  return (
    <div>
      <Header text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button onClick={handleVote} text='Vote' />
      <Button onClick={handleClick} text='Next anecdote' />
      <Header text='Anecdote  with most votes' />
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const MostVoted = ( {votes, anecdotes} ) => {
  const mostVoted = Math.max(...votes)
  
  let max = votes[0]
  let maxInd = 0

  for (let i = 1; i < votes.length; i++) {
    if (votes[i] > max) {
      maxInd = i
      max = votes[i]
    }
  }
  
  return(
    <div>
      <p>{anecdotes[maxInd]}</p>
      <p>Has {mostVoted} votes</p>
    </div>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)