require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const { v1: uuid } = require('uuid')

mongoose.set('useFindAndModify', false)

//const MONGODB_URI = 'mongodb+srv://ernove:QhzOjLU62aaAuXUC@cluster0-wbxjw.mongodb.net/libraryDB?retryWrites=true&w=majority'
const URI = process.env.MONGODB_URI

console.log('connecting to', URI)

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

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

        allBooks: (root, args) => {
//            let booksToReturn = Book.find({})
/*
            if (args.author !== undefined && args.author !== null) {
                booksToReturn = booksToReturn.filter(book => book.author === args.author)
            }
            if (args.genre !== undefined && args.genre !== null) {
                booksToReturn = booksToReturn.filter(book => book.genres.find(genre => genre === args.genre))
            } 
*/
            return Book.find({})
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

            if (!authorToAdd) {
                authorToAdd = new Author({ name: args.author, bookCount: 1})
                authorToAdd.save() 
            }

            const book = new Book({ ...args, author: authorToAdd})
        //    books = books.concat(book)
        /*    if (!authors.find(author => author.name === args.author)) {
                const author = {
                    name: args.author,
                    id: uuid(),
                    born: null,
                }
                authors = authors.concat(author)
            }
        */    
            return book.save()
        },

        editAuthor: (root, args) => {
            const author = authors.find(a => a.name === args.name)
            if (!author) {
              return null
            }
            const updatedAuthor = { ...author, born: args.setBornTo}
            authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
            return updatedAuthor
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