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
    <>
      <p>{blog.title} {blog.author}<button onClick={hideDetails}>hide</button></p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button onClick={() => handleLikes(blog.id)}>like</button></p>
      <p>{blog.user.username}</p>
      <button onClick={() => handleDelete(blog.id)}>remove</button>
    </>
  )

  const blogNoDetails = () => (
    <>
      {blog.title} {blog.author} <button onClick={showDetails}>details</button>
    </>
  )
  return (
    <div style={blogStyle}>
      { blogDetailVisible
        ? blogWithDetails()
        : blogNoDetails()
      }
    </div>
  )
}
export default Blog