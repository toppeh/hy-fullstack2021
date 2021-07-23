const lodash = require('lodash')

/* eslint-disable */
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
    const reducer = (total, val) => {
        return total + val.likes;
    }
    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    let mostLikes;
    blogs.forEach((blog) => {
        if (mostLikes === undefined) mostLikes = blog
        else if (blog.likes >= mostLikes.likes) mostLikes = blog
    })
    return mostLikes;
}

const mostBlogs = (blogs) => {
    const mostBlogs = lodash.countBy(blogs, (blog) => {return blog.author})
    let ret
    lodash.forEach(mostBlogs, (value, key) => {
        if (ret === undefined){ ret = { author: key, blogs: value }}
        else if (value > ret.blogs){ ret = { author: key, blogs: value } }
    })
    return ret
}

const mostLikes = (blogs) => {
    let likes = {}
    lodash.forEach(blogs, (blog) => {
        if (likes[blog.author] === undefined) likes[blog.author] = blog.likes
        else likes[blog.author] += blog.likes
    })
    let ret
    lodash.forEach(likes, (value, key) => {
        if (ret === undefined){ ret = { author: key, likes: value }}
        else if (value > ret.likes){ ret = { author: key, likes: value } }
    })
    return ret
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
