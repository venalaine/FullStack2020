import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (anecdote) => {

  console.log('updateVotessa ollaan', anecdote)
  const object = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  console.log('tämä on päivitettävä objekti', object)
  const response = await axios.put(baseUrl + '/' + object.id, object)
  return response.data
}

export default { getAll, createNew, updateVote }