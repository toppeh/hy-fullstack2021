import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from './Logout'

const Menu = () => {
  const user = useSelector(state => state.user)
  const padding = {
    paddingRight: 10
  }
  const style = {
    background: '#b0afac',
    paddingTop: 15,
    paddingLeft: 5,
    paddingBottom: 5
  }

  return (
    <div style={style}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {user.name} logged in <Logout></Logout>
    </div>
  )
}

export default Menu