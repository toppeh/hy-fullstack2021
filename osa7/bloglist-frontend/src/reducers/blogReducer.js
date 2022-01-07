import blogService from "../services/blogs"

export const addBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.addNew(data)
    return dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const response = await blogService.deleteBlog(id)
    console.log(response);
    return dispatch({
      type: 'DELETE',
      id
    })
  }
}

export const initBlogs = (data) => {
  return async dispatch => {
    const blogs  = await blogService.getAll()
    return dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.increaseLikes(blog)
    return dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

const reducer = (state=[], action) => {
  switch (action.type){
    case 'INIT':
      return action.data

    case 'NEW_BLOG':
      return state.concat(action.data)

    case 'LIKE':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data)

    case 'DELETE':
      return state.filter(blog => blog.id !== action.id)

    default:
      return state
  }
}

export default reducer