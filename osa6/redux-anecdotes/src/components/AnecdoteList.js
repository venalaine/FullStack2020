import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const Anecdote = ( { anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                Has {anecdote.votes} votes
                <button onClick={handleClick}>Vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    anecdotes.sort((a, b) => b.votes - a.votes)
    
    const dispatch = useDispatch()

    return (
        <div>
            <h2>List of Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => dispatch(voteAction(anecdote.id))}
                />)}
        </div>
    )
}

export default AnecdoteList