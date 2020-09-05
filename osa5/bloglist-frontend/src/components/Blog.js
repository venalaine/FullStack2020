import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlogAction, removeBlogAction } from '../reducers/blogReducer'
import { useParams, Redirect } from 'react-router-dom'

const Blog = ({ blogs, user }) => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const addLikes = () => {
    dispatch(likeBlogAction(blog))
  }

  const removeBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (confirm) {
      dispatch(removeBlogAction(blog))
    }

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

  if (!blog) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={`https://${blog.url}`} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      <br />
      {blog.likes} likes <button id="like-button" onClick={addLikes}> Like </button>
      <br />
      {blog.user.username}
      <br />
      {deleteButton()}
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
