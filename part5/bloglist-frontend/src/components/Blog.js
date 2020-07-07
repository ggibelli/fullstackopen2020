import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
      <p>{blog.likes} <button>like</button></p>
      { blog.user &&
        <p>{blog.user.username}</p>
      }
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