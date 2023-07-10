import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state) {
      return state
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch(like(updatedBlog))
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    if (window.confirm(`Remove blog called ${blog.title} ?`)) {
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
  }
}

export const { setBlogs, appendBlog, like } = blogSlice.actions
export default blogSlice.reducer
