import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = [
  'If it hurts, do it more often'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (title) => {
  return {
    title: title,
    author: 'Tester',
    id: getId(),
    likes: 0,
    url: 'www.test',
  }
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: initialState.map(asObject),
  reducers: {
    setBlogs(state, action) {
      console.log(action.payload)
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  }
})

export const initializeBlogs = ()  => {
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

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer