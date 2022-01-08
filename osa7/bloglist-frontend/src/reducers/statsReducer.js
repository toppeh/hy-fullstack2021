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
      // backend is a bit wonky and doesnt send the whole user on new blog creation
      const id = action.data.user
      return state.map(user => user.user.id !== id ? user : {
        ...user,
        writtenBlogs: user.writtenBlogs.concat(action.data)})

    default:
      return state
  }
}

export default reducer