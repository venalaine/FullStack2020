import axios from 'axios'

const getUsers = async () => {
  const request = axios.get('/api/users')
  const response = await request
  return response.data
}

export default { getUsers }