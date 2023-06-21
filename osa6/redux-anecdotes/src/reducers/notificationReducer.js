import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const showNotification = (notification, displayTime) => {
  return async dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => { 
      dispatch(setNotification('')) 
    }, displayTime * 1000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer