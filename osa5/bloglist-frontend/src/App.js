import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { useDispatch } from 'react-redux'
import { addNotificationAction } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
//  const [errorMessage, setErrorMessage] = useState(null)
//  const [message, setMessage] = useState(null)
  const [blogPostVisible, setBlogPostVisible] = useState(false)

  const hideWhenVisible = { display: blogPostVisible ? 'none' : '' }
  const showWhenVisible = { display: blogPostVisible ? '' : 'none' }

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const onLike = (id) => {
    setBlogs(blogs.map(blog => blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog))
  }

  const onDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
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
      //      setErrorMessage('Wrong username or password')
      //      setTimeout(() => {
      //        setErrorMessage(null)
      //      }, 2000)
      dispatch(addNotificationAction('Wrong username or password', 5000))
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })

    let messageText = `A new blog ${blogObject.title} by ${blogObject.author} added`
    //    setMessage(messageText)
    //    setTimeout(() => {
    //      setMessage(null)
    //    }, 2000)
    dispatch(addNotificationAction(messageText, 2000))
  }

  const showBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} onLike={onLike} onDelete={onDelete} />
        )}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification  />
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