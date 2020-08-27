import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotificationAction } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const renderNotification = () => {
    if (notification !== null) {
      setTimeout(() => {
        dispatch(removeNotificationAction())
      }, 5000)

      return (
        <div style={style}>
          {notification}
        </div>
      )
    }

    else {
      return (
        <div>
        </div>
      )
    }

  }

  return (
    <div>
      {renderNotification()}
    </div>
  )

}

export default Notification