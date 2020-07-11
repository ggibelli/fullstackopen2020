import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

const blog = {
  title: 'new blog',
  author: 'John Doe',
  url: 'www.google.com',
  likes: 10,
  user: 'giovanni'
}

test('renders blog title and blog author of a blog', () => {

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('new blog')
  expect(component.container).toHaveTextContent('John Doe')
  expect(component.container).not.toHaveTextContent('nwww.google.com')
})

test('the show details button shows url and likes of a blog', () => {
  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('details')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('www.google.com')
  expect(component.container).toHaveTextContent('10')
})

test('if the like button is clicked twice the event handler returns 5', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} handleLikes={mockHandler}/>
  )
  const buttonDetails = component.getByText('details')
  fireEvent.click(buttonDetails)
  const buttonLikes = component.getByText('like')
  fireEvent.click(buttonLikes)
  fireEvent.click(buttonLikes)
  expect(mockHandler.mock.calls).toHaveLength(2)
})