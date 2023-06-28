import loginService from '../services/login'
import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

const initialState = loggedUserJSON ? loggedUserJSON : null

const loginSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.clear()
    window.location.reload(false)
    dispatch(clearUser())
  }
}

export const { setUser, clearUser } = loginSlice.actions
export default loginSlice.reducer