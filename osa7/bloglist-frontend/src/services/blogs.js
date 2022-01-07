import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return `bearer ${user.token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNew = async (toAdd) => {
  const config = {
    headers: { Authorization: getToken()}
  }
  const response = await axios.post(baseUrl, toAdd, config)
  return response.data
}

const increaseLikes = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  const updatedLikes = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id
  }
  const response = await axios.put(url, updatedLikes)
  return response.data
}

const deleteBlog = async (blogId) => {
  const url = `${baseUrl}/${blogId}`
  const config = {
    headers: { Authorization: getToken()}
  }
  const response = await axios.delete(url, config)
  return response
}
const blogService = { getAll, addNew, increaseLikes, deleteBlog } 
// export default { getAll, addNew, setToken, increaseLikes, deleteBlog }
export default blogService