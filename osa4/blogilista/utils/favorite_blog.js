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

    const favBlogToReturn = {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }

    return favBlogToReturn
}

const singleFavoriteBlog = (blog) => {
    
    const blogToReturn = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }

    return blogToReturn
}

module.exports = {
    favoriteBlog,
    singleFavoriteBlog
}