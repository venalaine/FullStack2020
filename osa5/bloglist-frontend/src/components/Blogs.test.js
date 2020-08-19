import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('render right content', () => {
  const blog = {
    title: 'title of the blog',
    author: 'Antti Author',
    url: 'www.alko.fi',
    likes: 100
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'title of the blog',
  )

  expect(component.container).toHaveTextContent(
    'Antti Author',
  )

  expect(component.container).not.toHaveTextContent(
    'www.alko.fi',
  )

  expect(component.container).not.toHaveValue(
    100
  )
})