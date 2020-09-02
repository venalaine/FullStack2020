
import blogService from '../services/blogs'

const initialstate = []

const blogReducer = (state = initialstate, action) => {

  switch (action.type) {
  case 'INITIAL_BLOGS':
    return [...action.data.blogs]
  case 'ADD_BLOG':
    return [...state, action.data.blog]
  case 'LIKE_BLOG':
    return state.map(blog => blog.id !== action.data.blog.id ? blog : action.data.blog)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.blog.id)
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
        blog: blogToCreate
      }
    })
  }
}

export const likeBlogAction = (blog) => {

  return async dispatch => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1
    }

    const updatedBlog = await blogService.update(blogToUpdate)

    dispatch({
      type: 'LIKE_BLOG',
      data: {
        blog: updatedBlog,
      }
    })
  }
}

export const removeBlogAction = (blog) => {

  return async dispatch => {
    const response = await blogService.remove(blog)
    if (response.status === 204) {
      dispatch({
        type: 'REMOVE_BLOG',
        data: {
          blog: blog,
        }
      })
    }
  }
}

export default blogReducer