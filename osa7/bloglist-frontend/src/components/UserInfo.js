import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const User = ({ user }) => {
  return (
    <tr>
      <td><Link to={`/users/${user.user.id}`}>{user.user.name}</Link></td>
      <td>{user.writtenBlogs.length}</td>
    </tr>
  )
}

const UserInfo = ({ usersStats }) => {
  const stats = useSelector(state => state.stats)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th><strong>blogs created</strong></th>
          </tr>
          {stats.map(user => <User key={user.user.id} user={user} />)}
      </table>
    </div>
  )
}

export default UserInfo