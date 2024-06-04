import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import contactService from './services/contacts'
import SuccessNotification from './components/notifications/SuccessNotification'
import ErrorNotification from './components/notifications/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    contactService
      .getAll()
      .then(initialContacts => {
        console.log('promise fulfilled')
        setPersons(initialContacts)
      })
    }
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const contactsToShow = filter === '' ? persons : persons.filter(person => person.name.includes(filter))

  const addContact = (event) => {
    event.preventDefault()
    const findPersonName = persons.find((person) => person.name === newName)
    const numberExists = persons.find((person) => person.number === newNumber)
    const newPersonObject = {
      name: newName,
      number: newNumber
    }
    if (numberExists){
      alert(`${newName} is already added to phonebook`)
    }else if(findPersonName) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        contactService
        .update(findPersonName.id, newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== findPersonName.id ? person : returnedPerson))
        })
      }
    }else{
      contactService
        .create(newPersonObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDeleteOnClick = (person) => {
    return () => {
        if(window.confirm(`Delete ${person.name}?`)){
            contactService
            .deleteContact(person.id)
            .then(returnedPerson => {
              setPersons(persons.filter(person => person.id !== returnedPerson.id))
            })
            .catch(error => {
              setErrorMessage(`Information of ${person.name} has already been removed from the server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        }
    }
  }

  const handleNameOnChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberOnChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterOnChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <div>
        <Filter value={filter} onChange={handleFilterOnChange} />
      </div>
      <h2>add a new</h2>
      <PersonForm 
        addContact={addContact} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameOnChange={handleNameOnChange} 
        handleNumberOnChange={handleNumberOnChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={contactsToShow} handleDeleteOnClick={handleDeleteOnClick} />
    </div>
  )
}

export default App