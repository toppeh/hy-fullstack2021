import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const UserRow = ({ user }) => {
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
        <thead>
          <tr>
            <th></th>
            <th><strong>blogs created</strong></th>
          </tr>
        </thead>
        <tbody>
          {stats.map(user => <UserRow key={user.user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  )
}

export default UserInfo