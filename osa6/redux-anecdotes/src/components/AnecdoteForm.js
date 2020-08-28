import React from 'react'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { addNotificationAction } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        if (content !== '') {
            props.addAnecdoteAction(content)
            props.addNotificationAction(`You added '${content}'`, 5000)
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

const mapDispatchToProps = {
    addAnecdoteAction,
    addNotificationAction
}

const mapStateToProps = (state) => {
    return state
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm