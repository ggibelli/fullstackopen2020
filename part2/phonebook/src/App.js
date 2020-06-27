import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'

import phoneService from './services/Phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ browserMessage, setBrowserMessage ] = useState({message:'', type:''})

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
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setBrowserMessage({message:
            error.response.data.error, type: 'error'
          })
          setTimeout(() => {
            setBrowserMessage({message:'', type:''})
          }, 5000)
          setPersons(persons)
          
        })
      }
      else {
        return
      }
    }
    
    else {
      phoneService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setBrowserMessage({message:
            `Added '${newName}'`, type: 'success'
          })
          setTimeout(() => {
            setBrowserMessage({message:'', type:''})
          }, 5000) 
        }) 
        .catch(error => {
          console.log(error.response.data)
          setBrowserMessage({message:
            error.response.data.error, type: 'error'
          })
          setTimeout(() => {
            setBrowserMessage({message:'', type:''})
          }, 5000)
          setPersons(persons)
          
        })
        
    }  
    
  }

  const deletePerson = (person) => {
    phoneService
      .deletePerson(person.id)
      .then(hook)
      .catch(error => {
        setBrowserMessage({message:
          `the person '${person.name}' was already deleted from the server`, type: 'error'
        })
        setTimeout(() => {
          setBrowserMessage({message:'', type:''})
        }, 5000)
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
      <Notification message={browserMessage} />
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
