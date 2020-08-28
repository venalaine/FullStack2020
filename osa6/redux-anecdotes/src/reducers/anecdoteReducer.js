import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('reducerin logitus', action)
  switch (action.type) {

    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)

    case 'ADD_ANECDOTE':
      return [...state, action.data]

    case 'INITIALIZE':
      return action.data

    default:
      return state
  }
}

export const voteAction = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: {
        id: updatedAnecdote.id,
      }
    })
  }
}

export const addAnecdoteAction = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAction = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer