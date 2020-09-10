require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)

const URI = process.env.MONGODB_URI

console.log('connecting to', URI)

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`

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
    }
    
`

const resolvers = {
    Query: {

        bookCount: () => Book.collection.countDocuments(),

        authorCount: () => Author.collection.countDocuments(),

        allBooks: async (root, args) => {
            console.log('parametrit', args)
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

        allAuthors: () => Author.find({})

    },

    Author: {
        bookCount: (root) => {
            const booksToFilter = Book.find({})
            const filteredBooks = booksToFilter.filter(book => root.name === book.author)
            return filteredBooks.length
        }
    },

    Mutation: {
        addBook: async (root, args) => {
            let authorToAdd = await Author.findOne({ name: args.author })
            console.log(authorToAdd)
            if (!authorToAdd) {
                authorToAdd = new Author({ name: args.author, bookCount: 1 })
                authorToAdd.save()
            }

            const book = new Book({ ...args, author: authorToAdd })

            return book.save()
        },

        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                return null
            }
            author.born = args.setBornTo
            return author.save()
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})