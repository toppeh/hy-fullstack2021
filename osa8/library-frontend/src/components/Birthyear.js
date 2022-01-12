import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_BIRTHYEAR, ALL_AUTHORS } from "../queries";

const Birthyear = ({ show, authors }) => {
  const [author, setAuthor] = useState("")
  const [year, setYear] = useState("")
  const [setBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [ ALL_AUTHORS ],
    onError: (error) => {
      console.log(error);
    }
  })

  const submit = (event) => {
    event.preventDefault()
    setBirthyear( {variables: {
      author: author,
      year: Number(year)
    }})
    setAuthor("")
    setYear("")
  }
  if (!show){
    return null
  }
  /*
  <div>
          name <input name="author" type="text" value={author} onChange={({ target }) => {setAuthor(target.value)}}></input>
        </div>
  */
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        name <select value={author} onChange={event => setAuthor(event.target.value)}>
          {authors.map(author => 
            <option key={author.id} value={author.name}>{author.name}</option>)}
        </select>
        <div>
          born <input name="year" type="number" value={year} onChange={({ target }) => {setYear(target.value)}}></input>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Birthyear