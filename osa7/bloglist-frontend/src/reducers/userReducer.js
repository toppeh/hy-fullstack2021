export const login = (user) => {
  return {
    type: 'LOGIN',
    data: user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

const reducer = (state=null, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.data))
      return action.data
    
    case 'LOGOUT':
      localStorage.removeItem('user')
      return null
    
    default:
      return state
  }
}

export default reducer