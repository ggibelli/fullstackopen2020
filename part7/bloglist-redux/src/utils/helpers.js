import blogService from '../services/blogs'

const newBlog = async (blog) => {
  try {
    const newBlog = await blogService.create(blog)
    return newBlog
  } catch (error) {
    return {
      error: error.response.data.error
    }
  }
}

const newComment = async (comment, id) => {
  try {
    const commentedBlog = await blogService.comment({ comment: comment}, id)
    return commentedBlog
  } catch(error) {
    return {
      error: error.response.data.error
    }
  }
}

export default { 
  newBlog,
  newComment,
}