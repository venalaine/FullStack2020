import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const AddButton = styled.button`
background: light-Grey;
font-size: 1em;
margin: 0.3em;
padding: 0.25em 0.5em;
border: 3px solid Grey;
border-radius: 3px;
border-color: ForestGreen;
`
const Input = styled.input`
margin: 0.50em;
`

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
          Title
          <Input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitle}
          />
        </div>
        <div>
          Author
          <Input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthor}
          />
        </div>
        <div>
          Url
          <Input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={handleUrl}
          />
        </div>
        <br />
        <AddButton id="add-button" type="submit">Add</AddButton>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm