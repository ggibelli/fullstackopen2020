import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

import phoneService from './services/Phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')

  const hook = () => {
    phoneService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.find(person => person.name === newName)){
      const person = persons.find(person => person.name === newName)
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number?`)){
      phoneService
        .update(person.id, personObject)
        .then(returnedPerson =>{
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from the server`
          )
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
      else {
        return
      }
    }
    
    else {
      phoneService
        .create(personObject)
        .then(returnedBook => {
          setPersons(persons.concat(returnedBook))
          setNewName('')
          setNewNumber('')
        }) 
    }   
  }

  const deletePerson = (person) => {
    phoneService
      .deletePerson(person.id)
      .then(hook)
      .catch(error => {
        alert(
          `the person '${person.name}' was already deleted from the server`
        )
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleInputs = [{text: 'name', handler: handleAddName, value: newName}, 
    {text: 'number', handler: handleAddNumber, value: newNumber}]

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} addInputs={handleInputs}/>
      <h3>Numbers</h3>
      {personsFiltered.map((person, i) =>
          <Person 
            key={i} 
            person={person} 
            deletePerson={() => deletePerson(person)}
          />
        )}
    </div>
  )
}

export default App
