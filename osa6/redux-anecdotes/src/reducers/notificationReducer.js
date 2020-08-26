const initialState = 'Some weird message'

const notificationReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return state
        default:
            return state
    }
}

export const notificationAction = () => {
    return {
        type: 'NEW_NOTIFICATION',
        data: 'Some test shit'
    }
}

export default notificationReducer