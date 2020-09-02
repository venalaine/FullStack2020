import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlogAction } from '../reducers/blogReducer'

const Blog = ({ blog, user, onDelete }) => {
  const [showFull, setShowFull] = useState(false)
  const dispatch = useDispatch()

  const addLikes = () => {
    dispatch(likeBlogAction(blog))
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
    if (user.name === blog.user.username) {
      return (
        <div>
          <button id="delete-button" onClick={removeBlog}>Remove</button>
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
      <div id="closedBlog" style={blogStyle}>
        {blog.title} {blog.author} <button id="view-button" onClick={() => setShowFull(true)
        }>View</button>
      </div>
    )
  }

  else {
    return (
      <div id="openedBlog" style={blogStyle}>
        {blog.title} {blog.author} <button id="hide-button" onClick={() => setShowFull(false)
        }>Hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes} likes <button id="like-button" onClick={addLikes}> Like </button>
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
  onDelete: PropTypes.func.isRequired
}

export default Blog
