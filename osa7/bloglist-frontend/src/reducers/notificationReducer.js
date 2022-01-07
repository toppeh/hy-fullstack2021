const initialState = {
  content: '',
  class: 'notification',
  id: null
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export const setNotification = (content, className, duration) => {
  return async dispatch => {
    const id = setTimeout(() => {return dispatch(resetNotification())}, duration*1000)
    return dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content: content,
        className: className,
        id: id
      }
    })
  }
}

const reducer = (state=initialState, action ) => {
  switch (action.type){
    case 'SET_NOTIFICATION':
      if (state.id !== null){clearTimeout(state.id)}
      return action.data
    
    case 'RESET_NOTIFICATION':
      return {
        content: '',
        className: 'notification',
        id: null
      }

    default:
      return state
  }
}

export default reducer