import React, { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [blogDetailVisible, setBlogDetailVisible] = useState(false)
  const showDetails = () => {
    setBlogDetailVisible(true)
  }
  const hideDetails = () => {
    setBlogDetailVisible(false)
  }
  const blogStyle = {
    paddingTop: 1,
    paddingLeft: 1,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 1
  }
  const blogWithDetails = () => (
    <div className="blogWithDetails">
      <p className="titleAndAuthor">{blog.title} {blog.author}<button onClick={hideDetails}>hide</button></p>
      <p className="url">{blog.url}</p>
      <p className="likes">{blog.likes} <button onClick={() => handleLikes(blog.id)}>like</button></p>
      { blog.user
        ? <p>{blog.user.username}</p>
        : null
      }
      <button onClick={() => handleDelete(blog.id)}>remove</button>
    </div>
  )

  const blogNoDetails = () => (
    <div className="blogNoDetails">
      <p>{blog.title} {blog.author} <button onClick={showDetails}>details</button></p>
    </div>
  )
  return (
    <div style={blogStyle} className="blog">
      { blogDetailVisible
        ? blogWithDetails()
        : blogNoDetails()
      }
    </div>
  )
}
export default Blog