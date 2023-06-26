import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: notification.type === 'error' ? 'pink' : 'lightgreen',
    fontSize: 20,
    fontFamily: 'Helvetica',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    display: (notification === '') ? 'none' : ''
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification