import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

import helpers from '../utils/helpers'

const BlogForm = () => {
  const dispatch = useDispatch()
  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    const createdBlog = await helpers.newBlog(blog)
    if (!createdBlog.error) {
      dispatch(createBlog(createdBlog))
      document.querySelectorAll('input').forEach(input => input.value = '')
      dispatch(setNotification({ message: `new blog ${createdBlog.title} added`, type: 'success' }, 5))
    } else {
      dispatch(setNotification({ message: `${createdBlog.error}`, type: 'danger' }, 5))
    }
  }

  return (
    <div>
      <Form id="blog-form" onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
          />
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
          />
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            name="url"
          />
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm