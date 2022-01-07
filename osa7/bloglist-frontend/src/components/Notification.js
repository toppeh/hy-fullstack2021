import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
    if (notification.content === '') {
      return null
    }
  
    return (
      <div className={notification.className}>
        {notification.content}
      </div>
    ) 
  }



export default Notification