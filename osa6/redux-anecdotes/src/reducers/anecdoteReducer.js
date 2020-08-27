import anecdoteService from '../services/anecdotes'
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/

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
/*
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INITIALIZE',
    data: anecdotes
  }
}
*/

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer