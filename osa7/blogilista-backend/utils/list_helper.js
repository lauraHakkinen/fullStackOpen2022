// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const total_likes = (blogs) => {
  const sum = blogs.reduce((subsum, blog) => {
    return subsum + blog.likes
  }, 0)

  return blogs.length === 0
    ? 0
    : sum
}

const favorite_blog = (blogs) => {
  const most_likes = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }, 0)

  return blogs.length === 0
    ? 'no blogs'
    : most_likes
}

const most_blogs = (blogs) => {

  const blogCountByAuthor = {}
  blogs.forEach(blog => {
    if (blogCountByAuthor[blog.author]) {
      blogCountByAuthor[blog.author].blogs += 1
    } else {
      blogCountByAuthor[blog.author] = { author: blog.author, blogs: 1 }
    }
  })

  const authors = Object.values(blogCountByAuthor)
  return blogs.length === 0
    ? 'no blogs'
    : authorWithMost('blogs',  authors)
}

const most_likes = (blogs) => {

  const blogCountByAuthor = {}
  blogs.forEach(blog => {
    if (blogCountByAuthor[blog.author]) {
      blogCountByAuthor[blog.author].likes += blog.likes
    } else {
      blogCountByAuthor[blog.author] = { author: blog.author, likes: blog.likes }
    }
  })

  const authors = Object.values(blogCountByAuthor)
  return blogs.length === 0
    ? 'no blogs'
    : authorWithMost('likes',  authors)
}

const authorWithMost = (attribute, authors) => {
  return authors
    .reduce((currentAuthorWithMost, author) =>
      (author[attribute] > currentAuthorWithMost[attribute] ? author : currentAuthorWithMost),
    authors[0])
}

module.exports = {
  dummy,
  total_likes,
  favorite_blog,
  most_blogs,
  most_likes
}

