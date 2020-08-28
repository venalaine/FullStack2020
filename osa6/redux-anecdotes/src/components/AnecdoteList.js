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

    const anecdotes = useSelector(({ filter, anecdotes }) => {
     
        if (filter === null) {
            return anecdotes
        }

        else {
            const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
            return filteredAnecdotes
        }
    })

    anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        
        <div>
            <h2>List of Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={()=> dispatch(voteAction(anecdote), dispatch(addNotificationAction(anecdote.content)))}
                />)}
        </div>
        
    )
}

export default AnecdoteList