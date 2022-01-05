export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export const setNotification = (data) => {
  return {
    type: 'SET_NOTIFICATION',
    data: data
  }
}

const reducer = (state="", action ) => {
  switch (action.type){
    /*
    case 'NEW_ANECDOTE':
      const newState = `you added: ${action.data.content}`
      setTimeout(resetNotification(), 5000)
      return newState

    case 'VOTE':
      const voteNotification = `you voted id ${action.data.id}`
      setTimeout(() => resetNotification(), 5000)
      return voteNotification
    */
    case 'SET_NOTIFICATION':
      return action.data
    
    case 'RESET_NOTIFICATION':
      return ''

    default:
      return state
  }
}

export default reducer