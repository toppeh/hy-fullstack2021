import { useMutation } from "@apollo/client";
import React, {useState, useEffect} from "react";
import { LOGIN } from "../queries";

const Login = ({ show, loginCallback }) => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("") 

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      window.alert(error.message)
    }
  })

  useEffect(() => {
    if (result.data){
      const token = result.data.login.value 
      loginCallback(token)
    }
  }, [result.data, loginCallback])

  const handleLogin = (event) => {
    event.preventDefault()
    login({variables: {
      username: username,
      password: password
      }
    })
    setUsername("")
    setPassword("")
  }

  if (!show) {return null}

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username <input name='username' value={username} onChange={(event) => {setUsername(event.target.value)}}/>
        </div>
        <div>
          password <input name='password' type='password' value={password} onChange={(event) => {setPassword(event.target.value)}}/>
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

export default Login