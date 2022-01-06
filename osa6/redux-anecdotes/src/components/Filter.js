import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'


const Filter = ( {setFilter }) => {
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
  //  dispatch(setFilter(event.target.value))
    setFilter(event.target.value)  
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const ConnectedFilter = connect(
  null,
  { 
    setFilter 
  })(Filter)

export default ConnectedFilter