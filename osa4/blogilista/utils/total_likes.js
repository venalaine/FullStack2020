const totalLikes = (blogs) => {
    let totalLikes = 0

    blogs.map(blog => (totalLikes = totalLikes + blog.likes))

    return totalLikes
}

const singleLike = (blog) => {
    return blog.likes
}

module.exports = {
    totalLikes,
    singleLike
}