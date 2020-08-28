import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { addNotificationAction } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        if (content !== '') {
            dispatch(addAnecdoteAction(content))
            dispatch(addNotificationAction(`You added '${content}'`, 5000))
        }

    }


    return (
        <div>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm