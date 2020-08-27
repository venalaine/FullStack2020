const initialState = null

const filterReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_FILTER':
            return action.data.filter
        default:
            return state
    }
}

export const filterAction = (filter) => {
    return {
        type: 'ADD_FILTER',
        data: {
            filter: filter
        }
    }
}

export default filterReducer