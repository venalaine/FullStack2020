const mostLikes = (blogs) => {

    let authors = []
    let authorsLikes = []

    const handleBlog = (blog) => {
        if (!authors.includes(blog.author)) {
            authors.push(blog.author)
            authorsLikes.push(blog.likes)
        } else {
            const authorIndx = authors.indexOf(blog.author)
            authorsLikes[authorIndx] = authorsLikes[authorIndx] + blog.likes
        }
    }

    blogs.map(blog => handleBlog(blog))

    let mostLikes = Math.max.apply(Math, authorsLikes)
    let indexOfMostLikes = authorsLikes.indexOf(mostLikes)

    const objectToReturn = {
        author: authors[indexOfMostLikes],
        likes: mostLikes
    }
    
    return objectToReturn
}

module.exports = {
    mostLikes
}