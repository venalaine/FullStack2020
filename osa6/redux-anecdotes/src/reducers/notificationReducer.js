const initialState = null

const notificationReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return action.data.notification
        case 'REMOVE_NOTIFICATION':
            return action.data.notification
        default:
            return state
    }
}

export const addNotificationAction = (notification) => {
    return {
        type: 'ADD_NOTIFICATION',
        data: {
            notification: notification
        } 
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