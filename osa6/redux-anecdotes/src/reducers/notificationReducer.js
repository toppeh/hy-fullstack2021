import { useDispatch } from "react-redux"

const initialState = {
  content: "",
  id: null
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export const setNotification = (content, duration) => {
  return async dispatch => {
    const id = setTimeout(() => {return dispatch(resetNotification())}, duration*1000)
    return dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content: content,
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
        id: null
      }

    default:
      return state
  }
}

export default reducer