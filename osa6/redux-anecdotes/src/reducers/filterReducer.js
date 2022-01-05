export const setFilter = (newFilter) => {
  return {
    type: 'SET_FILTER',
    data: newFilter
  }
}

const reducer = (state="", action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data

    default:
       return state
  }
}

export default reducer