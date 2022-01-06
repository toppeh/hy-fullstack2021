import { useDispatch } from "react-redux"

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export const setNotification = (content, duration) => {
  return async dispatch => {
    setTimeout(() => {return dispatch(resetNotification())}, duration*1000)
    return dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    })
  }
}

const reducer = (state="", action ) => {
  switch (action.type){
    case 'SET_NOTIFICATION':
      return action.data
    
    case 'RESET_NOTIFICATION':
      return ''

    default:
      return state
  }
}

export default reducer