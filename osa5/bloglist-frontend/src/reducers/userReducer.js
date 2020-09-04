import userService from '../services/users'

const initialState = []

const userReducer = (state = initialState, action) => {

  switch (action.type) {
  case 'INIT_USERS':
    return action.data.users
  default:
    return state
  }
}

export const getUsersAction = () => {

  return async dispatch => {
    const users = await userService.getUsers()

    dispatch({
      type: 'INIT_USERS',
      data: {
        users: users
      }
    })
  }

}

export default userReducer