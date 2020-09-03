/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import User from './User'

const Users = () => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const users = await userService.getUsers()
            setUsers(users)
        }
        fetchData()
    }, [])

    console.log(users)

    if (users !== null) {
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

    else {
        return null
    }

}

export default Users