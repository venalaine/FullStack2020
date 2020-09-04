import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAction } from '../reducers/userReducer'
import User from './User'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      dispatch(getUsersAction())
    }
    fetchData()
  }, [dispatch])

  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => <tr key={user.id}><User key={user.id} user={user} /></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users