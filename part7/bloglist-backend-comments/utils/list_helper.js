const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  return blogs.map(blog => blog.likes).reduce((a, b) => a + b)
}

const mostBlogs = (blogs) => {
  const blogsPerAuthor = []
  if (blogs.length === 0) {
    return 0
  }
  const objBlogs = _.countBy(blogs, 'author')
  _.forEach(objBlogs, (value, key) => {
    blogsPerAuthor.push({ author: key, blogs: value })
  })
  return {
    author: _.orderBy(blogsPerAuthor, 'blogs', 'desc')[0].author,
    blogs: _.orderBy(blogsPerAuthor, 'blogs', 'desc')[0].blogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  return {
    author: _.orderBy(blogs, 'likes', 'desc')[0].author,
    likes: _.orderBy(blogs, 'likes', 'desc')[0].likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes
}