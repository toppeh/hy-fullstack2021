export const addBlog = (data) => {
  return {
    type: 'NEW_BLOG',
    data: data
  }
}

export const initBlogs = (data) => {
  return {
    type: 'INIT',
    data: data
  }
}

const reducer = (state=[], action) => {
  switch (action.type){
    case 'NEW_BLOG':
      return state.concat(action.data)

    case 'INIT':
      return action.data

    default:
      return state
  }
}

export default reducer