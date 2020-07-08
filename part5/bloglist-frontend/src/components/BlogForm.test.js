import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'New blog' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Myself' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'www.woooow.com' }
  })
  fireEvent.submit(form)
  const newBlog = { title: 'New blog', author: 'Myself', url: 'www.woooow.com' }
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(newBlog)
})