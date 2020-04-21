const favoriteBlog = (blogs) => {

    let maxLikes = 0
    let favBlog = null

    const tuneFavBlog = (blog) => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            favBlog = blog
        } 
    }

    blogs.map(blog => tuneFavBlog(blog))

    return favBlog
}

const singleFavoriteBlog = (blog) => {
    return blog
}

module.exports = {
    favoriteBlog,
    singleFavoriteBlog
}