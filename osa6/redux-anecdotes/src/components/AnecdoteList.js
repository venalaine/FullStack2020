import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const showAnectodes = (anecdotes, vote) => {
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

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAction(id))
    }

    return (
        <div>
            <h2>List of Anecdotes</h2>
            {showAnectodes(anecdotes, vote)}
        </div>
    )
}

export default AnecdoteList