import React, { useReducer } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render right content', () => {

  const blog = {
    title: 'title of the blog',
    author: 'Antti Author',
    url: 'www.alko.fi',
    likes: 100,
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'title of the blog',
  )

  expect(component.container).toHaveTextContent(
    'Antti Author',
  )

  expect(component.container).not.toHaveTextContent(
    'www.alko.fi',
  )

  expect(component.container).not.toHaveTextContent(
    100
  )
})

test('after buttton click there is more content rendered', () => {

  const user = {
    id: 1,
    username: 'Testimies',
  }

  const blog = {
    title: 'title of the blog',
    author: 'Antti Author',
    url: 'www.example.fi',
    likes: 100,
    user: user,
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  component.debug()

  expect(component.container).toHaveTextContent(
    'www.example.fi',
  )

  expect(component.container).toHaveTextContent(
    '100',
  )


})