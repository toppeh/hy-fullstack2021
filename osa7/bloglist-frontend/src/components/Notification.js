import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const state = useSelector(state => state)
  console.log(state.className);
    if (state.content === '') {
      return null
    }
  
    return (
      <div className={state.className}>
        {state.content}
      </div>
    ) 
  }



export default Notification