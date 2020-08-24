import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm does right calls', () => {

  const addBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={addBlog} />
  )

  const title = component.container.querySelector('#title')
  fireEvent.change(title, {
    target: { value: 'Doing ultimate testing' }
  })

  const author = component.container.querySelector('#author')
  fireEvent.change(author, {
    target: { value: 'Antti Author' }
  })

  const url = component.container.querySelector('#url')
  fireEvent.change(url, {
    target: { value: 'www.example.fi' }
  })

  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)

  expect(addBlog.mock.calls[0][0].title).toBe('Doing ultimate testing')

  expect(addBlog.mock.calls[0][0].author).toBe('Antti Author')

  expect(addBlog.mock.calls[0][0].url).toBe('www.example.fi')

})