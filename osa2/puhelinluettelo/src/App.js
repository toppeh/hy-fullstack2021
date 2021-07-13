import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    console.log("axios wow");
    axios
        .get('http://localhost:3001/persons')
        .then(response => {console.log("promiseeee"); setPersons(response.data)})
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined) { 
      window.alert(`${newName} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange =(event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>

      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

export default App