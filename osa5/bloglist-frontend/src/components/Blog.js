import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlogAction, removeBlogAction } from '../reducers/blogReducer'
import { useParams, Redirect } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
background: light-Grey;
font-size: 1em;
padding: 0.2em 0.1em;
border: 2px solid Grey;
border-radius: 2px;
`

const BlogDiv = styled.div`
border: 1px solid Grey;
`

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
          <Button id="delete-button" onClick={removeBlog}>Remove</Button>
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
    <BlogDiv>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={`https://${blog.url}`} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      <br />
      {blog.likes} likes <Button id="like-button" onClick={addLikes}> Like </Button>
      <br />
      {blog.user.username}
      <br />
      {deleteButton()}
    </BlogDiv>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
