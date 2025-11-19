import { useEffect, useState } from 'react';
import personService from './services/persons';
import ContactForm from './components/ContactForm';
import Persons from './components/Persons';
import FilterContacts from './components/FilterContacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchStr, setSearchStr] = useState('');

  // fetch persons from server
  useEffect(() => {
    console.log('Effect running');
    personService.getAllPersons()
      .then(initialPersons => {
        console.log('Promise fulfilled');
        setPersons(initialPersons);
      })

  }, []);

  console.log('Render', persons)

  // show persons after search applied
  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().startsWith(searchStr);
  });

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    const filter = e.target.value;
    setSearchStr(filter.toLowerCase());
  };

  const addPerson = (e) => {
    e.preventDefault();

    const dupe = persons.find(person => person.name === newName);

    if (dupe) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }
    const personObj = {
      name: newName,
      number: newNumber
    };
    personService.createNewPerson(personObj)
      .then(returnedPerson =>{
        console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterContacts searchStr={searchStr} handleSearch={handleSearchChange} />
      <h3>Add a new</h3>
      <ContactForm 
        onSubmit={addPerson} 
        name={newName} 
        number={newNumber}
        handleName={handleNameChange}
        handleNumber={handleNumChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  )
}

export default App;
