import React from 'react'

const User = ({ user }) => {

  return (
    <>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </>
  )
}

export default User