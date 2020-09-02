/* eslint-disable indent */
import blogService from '../services/blogs'

const initialstate = []

const blogReducer = (state = initialstate, action) => {

    switch (action.type) {
        case 'INITIAL_BLOGS':
            console.log('reduceriin tuleva action data', action.data.blogs)
            return [...action.data.blogs]
        case 'ADD_BLOG':
            return [...state, action.data.data]
        default:
            return state

    }

}

export const initialBlogsAction = () => {

    return async dispatch => {
        const blogs = await blogService.getAll()

        dispatch({
            type: 'INITIAL_BLOGS',
            data: {
                blogs: blogs
            }
        })
    }
}

export const addBlogAction = (blog) => {

    return async dispatch => {
        const blogToCreate = await blogService.create(blog)

        dispatch({
            type: 'ADD_BLOG',
            data: {
                data: blogToCreate
            }
        })
    }
}

export default blogReducer