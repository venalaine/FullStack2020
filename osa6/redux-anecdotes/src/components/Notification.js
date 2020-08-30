import React from 'react'
import { removeNotificationAction } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const renderNotification = () => {
    if (props.notification !== null) {
      return props.notification.text
    }
  }

  return (
    <div style={style}>
      {renderNotification()}
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

const mapDispatchToProps = {
  removeNotificationAction
}

const ConnectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)
export default ConnectedNotification