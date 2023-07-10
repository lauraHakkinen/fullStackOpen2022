import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import blogService from './services/blogs'
import { setBlogs } from './reducers/blogReducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

blogService.getAll().then(blogs => store.dispatch(setBlogs(blogs)))
