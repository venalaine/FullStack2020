import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log(action.data)
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

export const voteAction = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: {
      id: id
    }
  }
}

export const addAnecdoteAction = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content: content,
      //      id: getId(),
      votes: 0
    }
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer