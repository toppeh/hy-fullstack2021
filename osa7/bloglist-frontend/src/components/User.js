import React from "react";

const User = ({ data }) => {
  if (!data){
    return null
  }
  const user = data.user
  const blogs = data.writtenBlogs
  return (
    <div>
      <h2>{user.name}</h2>
      <p></p>
      <h3>added blogs</h3>
      <p></p>
      <ul>
        {blogs.map(blog => {
          return (<li key={blog.id}>
            {blog.title}
          </li>
          )})}
      </ul>
    </div>
  )
}

export default User