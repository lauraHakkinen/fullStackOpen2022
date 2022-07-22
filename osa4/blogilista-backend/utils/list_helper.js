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

module.exports = {
  dummy,
  total_likes,
  favorite_blog
}

