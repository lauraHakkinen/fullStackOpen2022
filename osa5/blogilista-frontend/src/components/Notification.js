const Notification = ({ notification }) => {
  if (notification.message === null) return null

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: notification.type === 'error' ? 'pink' : 'lightgreen',
    fontSize: 20,
    fontFamily: 'Helvetica',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className="error" style={style}>
      {notification.message}
    </div>
  )
}

export default Notification