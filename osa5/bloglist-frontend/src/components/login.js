import React, {useState} from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) =>{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const createUser = (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password
    }
    handleLogin(user)
    setUsername('')
    setPassword('')
  }

  return (
  <>
  <h2>Login</h2>
    <form onSubmit={createUser}>
      <div>
        username         
        <input            
        type="text"            
        value={username}            
        name="Username"            
        onChange={({ target }) => setUsername(target.value)}
        />        
        </div>        
        <div>          
          password            
          <input            
          type="password"            
          value={password}            
          name="Password"            
          onChange={({ target }) => setPassword(target.value)}          
          />        
        </div>        
        <button type="submit">login</button>      
      </form>
  </>
)
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}
export default LoginForm