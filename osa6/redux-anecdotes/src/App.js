import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAction(id))
  }

  const showAnectodes = () => {
    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
      <div>
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
      </div>
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {showAnectodes()}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App