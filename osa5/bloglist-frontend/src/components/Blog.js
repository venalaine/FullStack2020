import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showFull, setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showFull === false) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setShowFull(true)
        }>View</button>
      </div>
    )
  }

  else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setShowFull(false)
        }>Hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes}
        <br />
        {blog.user.username}
      </div>
    )
  }
}

export default Blog
