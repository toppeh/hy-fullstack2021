import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Logout = () => {
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('logged out', 'notification', 5))
  }
  return <button onClick={handleLogout}>logout</button>
}

export default Logout