const initialState = null
let timer = null

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export const addNotificationAction = (text, time) => {

  clearTimeout(timer)

  return async dispatch => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: {
        text: text,
        time: time
      }
    })

    timer = setTimeout(() => {
      dispatch(removeNotificationAction())
    }, time)
  }
}

export const removeNotificationAction = () => {

  return {
    type: 'REMOVE_NOTIFICATION',
    data: {
      notification: null
    }
  }
}

export default notificationReducer