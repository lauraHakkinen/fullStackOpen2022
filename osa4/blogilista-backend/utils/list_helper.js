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

module.exports = {
  dummy,
  total_likes
}

