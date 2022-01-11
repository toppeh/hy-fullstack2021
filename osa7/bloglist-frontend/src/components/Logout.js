import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Logout = () => {
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('logged out', 'notification', 5))
  }
  return <Button onClick={handleLogout}>logout</Button>
}

export default Logout