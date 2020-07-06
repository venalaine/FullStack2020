import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
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
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string
}

export default Notification