require('dotenv').config()
const jwt = require('jsonwebtoken')
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const URI = process.env.MONGODB_URI

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

console.log('connecting to', URI)

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
  
    type Token {
        value: String!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }
    
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
    
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author

        createUser(
            username: String!
            favoriteGenre: String!
        ): User
          
        login(
            username: String!
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
    }
    
`

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
    Query: {

        bookCount: () => Book.collection.countDocuments(),

        authorCount: () => Author.collection.countDocuments(),

        allBooks: async (root, args) => {

            let booksToReturn = await Book.find({})

            if (args.author) {
                const authorToFilter = await Author.findOne({ name: args.author })
                booksToReturn = booksToReturn.filter(book => book.author && book.author.toString() === authorToFilter._id.toString())
            }
            if (args.genre) {
                booksToReturn = booksToReturn.filter(book => book.genres.find(genre => genre === args.genre))
            }

            return booksToReturn
        },

        allAuthors: () => Author.find({}),

        me: (root, args, context) => {
            return context.currentUser
        }

    },

    Author: {
        bookCount: async (root) => {

            const author = await Author.findOne({ name: root.name })
            const booksToFilter = await Book.find({})
            const filteredBooks = booksToFilter.filter(book => author && author._id.toString() === book.author.toString())
            return filteredBooks.length
        }
    },

    Book: {
        author: async (root) => {

            const author = await Author.findById(root.author)
            return author
        }
    },

    Mutation: {
        addBook: async (root, args, context) => {

            let authorToAdd = await Author.findOne({ name: args.author })

            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            if (authorToAdd) {
                authorToAdd.bookCount = authorToAdd.bookCount + 1
            }

            if (!authorToAdd) {
                authorToAdd = new Author({ name: args.author, bookCount: 1, born: null })
                try {
                    await authorToAdd.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }

            }

            const book = new Book({ ...args, author: authorToAdd })

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },

        editAuthor: async (root, args, context) => {
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                return null
            }

            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            author.born = args.setBornTo

            return author.save()
        },

        createUser: (root, args) => {
            const user = new User({ ...args })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User
                .findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})