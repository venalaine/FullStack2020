import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notifications)

  if (notification === null) {
    return null
  }

  const notificationStyle = {
    color: 'purple',
    background: 'lightgrey',
    fontSize: 25,
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