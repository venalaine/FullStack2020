import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNotificationAction } from './reducers/notificationReducer'
import { initialBlogsAction, addBlogAction } from './reducers/blogReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogPostVisible, setBlogPostVisible] = useState(false)

  const hideWhenVisible = { display: blogPostVisible ? 'none' : '' }
  const showWhenVisible = { display: blogPostVisible ? '' : 'none' }

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initialBlogsAction())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const onDelete = (id) => {
    // setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(addNotificationAction('Wrong username or password', 5000))
    }
  }

  const addBlog = (blogObject) => {

    dispatch(addBlogAction(blogObject))
    let messageText = `A new blog ${blogObject.title} by ${blogObject.author} added`
    dispatch(addNotificationAction(messageText, 2000))
  }

  const showBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} onDelete={onDelete} />
        )}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick={handleLogOut}>Log out</button> </p>
      <div style={hideWhenVisible}>
        <button id="create-new-button" onClick={() => setBlogPostVisible(true)}>Create new</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog={addBlog} />
      </div>
      <div style={showWhenVisible}>
        <button onClick={() => setBlogPostVisible(false)}>Cancel</button>
      </div>
      <br />
      {showBlogs()}
    </div>
  )
}

export default App