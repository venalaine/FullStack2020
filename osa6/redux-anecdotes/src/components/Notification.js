import React from 'react'
import { removeNotificationAction } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log('mitä luuraa propseissa', props)


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const renderNotification = () => {
    if (props.notification !== null) {

      setTimeout(() => {
        props.removeNotificationAction()
      }, props.notification.time)

      return (
        <div style={style}>
          {props.notification.text}
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