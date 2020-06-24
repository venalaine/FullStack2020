import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showFull, setShowFull] = useState(false)
  let [likes, setLikes] = useState(blog.likes)
  
  const addLikes = () => {
    const blogToUpdate = {
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }

    blogService.update(blogToUpdate)
    
    setLikes(likes + 1)

  }

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
        {likes} <button onClick={addLikes}> Like </button>
        <br />
        {blog.user.username}
      </div>
    )
  }
}

export default Blog
