import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAction } from '../reducers/userReducer'
import User from './User'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom'

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
    <Router>
      <Switch>
        <Route path="/users/:id">
          <User users={users} />
        </Route>
        <Route path="/users">
          <h2>Users</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>blogs created</th>
              </tr>
              {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
            </tbody>
          </table>
        </Route>
      </Switch>
    </Router>
  )
}

export default Users