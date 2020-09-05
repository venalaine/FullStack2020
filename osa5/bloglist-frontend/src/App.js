import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { addNotificationAction } from './reducers/notificationReducer'
import { initialBlogsAction, addBlogAction } from './reducers/blogReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import styled from 'styled-components'
import Footer from './components/Footer'

const Button = styled.button`
background: light-grey;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 3px solid Grey;
border-radius: 3px;
`
const CancelButton = styled.button`
background: light-grey;
font-size: 1em;
margin: 0.3em;
padding: 0.25em 1em;
border: 3px solid Grey;
border-radius: 3px;
`

const LogoutButton = styled.button`
background: light-grey;
font-size: 1em;
margin: 0.3em;
padding: 0.25em 1em;
border: 3px solid Grey;
border-radius: 3px;
border-color: FireBrick;
`

const Input = styled.input`
margin: 0.50em;
`
const Page = styled.div`
padding: 1em;
background: Snow;
`

const Navigation = styled.div`
  background: Gainsboro;
  padding: 1.5em;
`

const BlogsDiv = styled.div`
border: 2px solid Grey;
`

const BlogListDiv = styled.div`
border: 1px solid Grey;
`

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

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const tableStyle = {
      width: '100%'
    }

    return (
      <Page>
        <Router>
          <Switch>
            <Route path="/blogs/:id">
              <Blog blogs={blogs} user={user} />
            </Route>
            <Route path="/">
              <BlogListDiv>
                <table style={tableStyle}>
                  <tbody>
                    {blogs.map(blog => <tr key={blog.id}><td style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td></tr>)}
                  </tbody>
                </table>
              </BlogListDiv>
            </Route>
          </Switch>
        </Router>
      </Page>
    )
  }

  if (user === null) {
    return (
      <Page>
        <h1>Log in to application</h1>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            Username
            <Input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <Input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button id="login-button" type="submit">login</Button>
        </form>
        <Footer />
      </Page>
    )
  }

  const padding = {
    padding: 6
  }

  return (
    <Page>
      <Router>
        <Navigation>
          <Link style={padding} to="/">BLOGS</Link>
          <Link style={padding} to="/users">USERS</Link>
          {user
            ? <b><i>{user.name} logged in <LogoutButton onClick={handleLogOut}>Log out</LogoutButton></i></b>
            : <Link style={padding} to="/login">login</Link>
          }
        </Navigation>
        <BlogsDiv>
          <h2>Blogs</h2>
          <Notification />
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <div style={hideWhenVisible}>
                <Button id="create-new-button" onClick={() => setBlogPostVisible(true)}>Create new</Button>
              </div>
              <div style={showWhenVisible}>
                <BlogForm createBlog={addBlog} />
              </div>
              <div style={showWhenVisible}>
                <CancelButton onClick={() => setBlogPostVisible(false)}>Cancel</CancelButton>
              </div>
              <br />
              {showBlogs()}
            </Route>
          </Switch>
        </BlogsDiv>
      </Router>
      <Footer />
    </Page>
  )
}



export default App