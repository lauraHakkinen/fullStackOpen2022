const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return action.data.notification
    case "CLEAR": 
      return action.data.notification
    default:
      return state
  }
}

export const notificationObject = ( type, message ) => {
  return {
    type: type,
    data: {
      notification: message,
    }
  }
}

export default notificationReducer