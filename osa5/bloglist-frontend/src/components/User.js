/* eslint-disable indent */
import React from 'react'

const User = ({ user }) => {
    console.log('propsina tulee', user)

    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
        </tr>
    )
}

export default User