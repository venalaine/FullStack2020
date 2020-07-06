import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, onLike, onDelete }) => {
  const [showFull, setShowFull] = useState(false)

  const addLikes = () => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1
    }

    blogService.update(blogToUpdate)
    onLike(blogToUpdate.id)
  }

  const removeBlog = () => {
    const blogToRemove = {
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
    }

    const confirm = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)

    if (confirm) {
      blogService.remove(blogToRemove)
    }

    onDelete(blogToRemove.id)
    
  }

  const deleteButton = () => {
    if (user.username === blog.user.username) {
      return (
        <div>
          <button onClick={removeBlog}>Remove</button>
        </div>
      )
    }
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
        {blog.likes} <button onClick={addLikes}> Like </button>
        <br />
        {blog.user.username}
        <br />
        {deleteButton()}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Blog
