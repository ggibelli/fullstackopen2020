import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleDelete, myBlog }) => {
  const [blogDetailVisible, setBlogDetailVisible] = useState(false)
  const label = blogDetailVisible
    ? 'hide' : 'details'

  const showWhenVisible = { display: blogDetailVisible ? '' : 'none' }

  const hideDetails = () => {
    setBlogDetailVisible(!blogDetailVisible)
  }
  const blogStyle = {
    paddingTop: 1,
    paddingLeft: 1,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 1
  }
  return (
    <div style={blogStyle} className="blog">
      <div className="blogWithDetails">
        <p className="titleAndAuthor">{blog.title} {blog.author}<button onClick={hideDetails}>{label}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p className="url">{blog.url}</p>
        <p className="likes">likes: {blog.likes} <button id="like" onClick={() => handleLikes(blog.id)}>like</button></p>
        { blog.user
          ? <p>{blog.user.username}</p>
          : null
        }
        { myBlog &&
        <button id="remove" onClick={() => handleDelete(blog.id)}>remove</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  myBlog: PropTypes.bool.isRequired
}

export default Blog