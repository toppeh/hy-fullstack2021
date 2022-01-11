import React, { useEffect, useState } from "react";
import blogService from '../services/blogs'
import { Button } from "react-bootstrap";

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  useEffect(() => {
    blogService.getComments(blogId).then((res) => {
      setComments(res)
    })
  }, [blogId])

  const handleChange = (event) => {
    setNewComment(event.target.value)
  }

  const postComment = async (event) => {
    event.preventDefault()
    const postedComment = await blogService.postComment(blogId, newComment)
    setNewComment("")
    setComments(comments.concat(postedComment))
  }

  return (
    <div>
      <h3>comments</h3>
      <div>
      <form onSubmit={postComment}>
        <input onChange={handleChange} value={newComment}></input>
        <Button>add comment</Button>
      </form>
    </div>
      <ul>
        {comments.map((comment) => 
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}
export default Comments