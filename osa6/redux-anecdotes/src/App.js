import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
        <h1>Anecdote application</h1>
        <Notification />
        <br/>
        <h2>Add anecdote</h2>
        <AnecdoteForm />
        <AnecdoteList />

    </div>
  )
}

export default App