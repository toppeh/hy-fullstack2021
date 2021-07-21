import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    axios
        .get('http://localhost:3001/api/persons')
        .then(response => {setPersons(response.data)})
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === "" || newNumber === ""){
      window.alert("Name or number can't be empty")
      return
    }
    if (persons.find(person => person.name === newName) !== undefined) { 
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updated = {...persons.find(p => p.name === newName), number: newNumber}
        console.log(updated);
        PersonsService
            .update(updated)
            .then(response => {
                console.log(response);
                setPersons(persons.map(p => p.name !== newName ? p : response ))
                setNewName('')
                setNewNumber('')
                setNotification(`Changed ${updated.name}'s number`)
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
              })
            .catch(err => {
              console.log(err)
              setErrorMessage(`Information of ${updated.name} has already been removed from the server`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
      }
      return
    }
    const id = persons[persons.length-1].id + 1
    const newContact = {name: newName, number: newNumber, id: id}
    PersonsService
        .create(newContact)
        .then((response) => {
          console.log("create response:",response);
          setPersons(persons.concat(newContact))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newContact.name}`)
          setTimeout(() => {
              setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
        })
  }

  const deletePerson = (id) => {
      console.log(id)
      const tbd = persons.find(p => p.id === id)
      console.log(tbd);
      if (window.confirm(`Delete ${tbd.name}?`)){
        PersonsService
          .destroy(id)
          .then(data => {
              console.log(`Deleted id ${id}`);
              setPersons(persons.filter(p => p.id !== id))
              setNotification(`Deleted ${tbd.name}`)
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
          })
          .catch(err => console.log(err))
      }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} className="notification" />
      <Notification message={errorMessage} className="error" />
      <Filter handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={deletePerson} />
    </div>
  )

}

export default App