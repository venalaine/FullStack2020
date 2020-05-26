const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }
]

const intialUser = {
    username: "uniikki",
    name: "uniikki",
    password: "uniikki"
}

beforeEach(async () => {
    await Blog.deleteMany({})

    for (i = 0; i < initialBlogs.length; i++) {
        let blogObject = new Blog(initialBlogs[i])
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('right number of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id field has right format', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0].id).toBeDefined();
})

test('amount of blogs rises by one when posting new blog', async () => {
    await User.deleteMany({})

    await api
        .post('/api/users')
        .send(intialUser)

    const loggedUser = await api
        .post('/api/login')
        .send({ "username": intialUser.username, "password": intialUser.password })

    const token = "bearer " + loggedUser.body.token

    const newBlog = {
        title: "The Art of Adding Blogs",
        author: "Uniikki",
        url: "https://testi.fi",
        likes: 16
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token })
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('The Art of Adding Blogs')

})

test('likes should be 0 if no value inserted', async () => {
    await User.deleteMany({})

    await api
        .post('/api/users')
        .send(intialUser)

    const loggedUser = await api
        .post('/api/login')
        .send({ "username": intialUser.username, "password": intialUser.password })

    const token = "bearer " + loggedUser.body.token

    const newBlog = {
        title: "How to have no likes",
        author: "Erno Venäläinen",
        url: "https://github.com/venalaine/FullStack2020/tree/master/osa4/blogilista",
        likes: ""
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: token })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[initialBlogs.length].likes).toBe(0)

})

test('title and url are mandatory', async () => {
    await User.deleteMany({})

    await api
        .post('/api/users')
        .send(intialUser)

    const loggedUser = await api
        .post('/api/login')
        .send({ "username": intialUser.username, "password": intialUser.password })

    const token = "bearer " + loggedUser.body.token

    const newBlog1 = {
        author: "Erno Venäläinen",
        url: "https://github.com/venalaine/FullStack2020/tree/master/osa4/blogilista",
        likes: "10"
    }

    await api
        .post('/api/blogs')
        .send(newBlog1)
        .set({ Authorization: token })
        .expect(400)

    await User.deleteMany({})

    await api
        .post('/api/users')
        .send(intialUser)

    const loggedUser2 = await api
        .post('/api/login')
        .send({ "username": intialUser.username, "password": intialUser.password })

    const token2 = "bearer " + loggedUser2.body.token

    const newBlog2 = {
        title: "Writing blogs without url info",
        author: "Erno Venäläinen",
        likes: ""
    }

    await api
        .post('/api/blogs')
        .send(newBlog2)
        .set({ Authorization: token2 })
        .expect(400)

})

test('post without token is not allowed', async () => {

    const newBlog = {
        title: "How to post without token",
        author: "Erno Venäläinen",
        url: "https://github.com/venalaine/FullStack2020/tree/master/osa4/blogilista",
        likes: ""
    }

    const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid token')

})

afterAll(() => {
    mongoose.connection.close()
})