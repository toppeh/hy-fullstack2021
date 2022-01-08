const reducer = (state=[], action) => {
  switch (action.type) {
    case 'INIT':
      let newState = []
      action.data.forEach(element => {
        if (element.user){
          const index = newState.findIndex(a => a.user.id === element.user.id)
          if (index === -1) {
            newState.push({
              user: element.user,
              writtenBlogs: [element]
            })
          } else {
            newState[index].writtenBlogs.push(element)
          }
        }
      });
      return newState
    
    case 'NEW_BLOG':
      // backend is a bit wonky and doesn't send the whole user on new blog creation
      const id = action.data.user
      const index = state.find(el => el.user.id === id) 
      if (index === -1){
        return state.concat({
          user: action.data.user,
          writtenBlogs: [action.data]
        })
      }
      return state.map(user => user.user.id !== id ? user : {
        ...user,
        writtenBlogs: user.writtenBlogs.concat(action.data)})
    
    case 'DELETE':
      console.log(action);
      return state.map(el => {
        return {
          user: el.user,
          writtenBlogs: el.writtenBlogs.filter(blog => blog.id !== action.id)
        }
    })
    
    default:
      return state
  }
}

export default reducer