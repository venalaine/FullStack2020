import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <h1>Anecdote application</h1>
      <Notification />
      <br />
      <h2>Add anecdote</h2>
      <AnecdoteForm />
      <AnecdoteList />
      <br />
      <Filter />
    </div>
  )
}

export default App