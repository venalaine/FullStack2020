const mostBlogs = (blogs) => {

    let authors = []
    let authorBlogs = []

    const handleAuthor = (author) => {        
        if (authors.includes(author)) {
            const index = authors.indexOf(author)
            authorBlogs[index] = authorBlogs[index] + 1
        }

        else {
            authors.push(author)
            authorBlogs.push(1)
        }
    } 

    blogs.map(blog => handleAuthor(blog.author))

    let mostBlogs = Math.max.apply(Math, authorBlogs)
    let indexOfMostBlogs = authorBlogs.indexOf(mostBlogs)

    const objectToReturn = {
        author: authors[indexOfMostBlogs],
        blogs: mostBlogs
    }

    return objectToReturn
}

module.exports = {
    mostBlogs
}