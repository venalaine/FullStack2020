import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { addNotificationAction } from '../reducers/notificationReducer'

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
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <div>
            <h2>List of Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={()=> dispatch(voteAction(anecdote.id), dispatch(addNotificationAction(anecdote.content)))}
                />)}
        </div>
    )
}

export default AnecdoteList