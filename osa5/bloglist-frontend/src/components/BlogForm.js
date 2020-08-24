import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
                    Title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitle}
          />
        </div>
        <div>
                    Author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthor}
          />
        </div>
        <div>
                    Url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={handleUrl}
          />
        </div>
        <br />
        <button id="add-button" type="submit">Add</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm