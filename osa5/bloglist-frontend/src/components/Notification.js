import React from 'react'
import { useSelector } from 'react-redux'
// import { removeNotificationAction } from '../reducers/notificationReducer'


const Notification = () => {

  const notification = useSelector(state => state)

  if (notification === null) {
    return null
  }

  const notificationStyle = {
    color: 'blue',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className="error" style={notificationStyle}>
      {notification.text}
    </div>
  )
}


export default Notification