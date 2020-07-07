import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleAddTitle = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAddAuthor = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleAddUrl = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create a new blog post</h2>

      <form onSubmit={addBlog}>
        <div>Title:
          <input
            value={newBlogTitle}
            onChange={handleAddTitle}
          />
        </div>
        <div>Author:
          <input
            value={newBlogAuthor}
            onChange={handleAddAuthor}
          />
        </div>
        <div>Url:
          <input
            value={newBlogUrl}
            onChange={handleAddUrl}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm