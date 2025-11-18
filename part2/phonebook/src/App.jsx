import { useState } from 'react';
import ContactForm from './components/ContactForm';
import Persons from './components/Persons';
import FilterContacts from './components/FilterContacts';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchStr, setSearchStr] = useState('');

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
    setPersons(persons.concat(personObj));
    setNewName('');
    setNewNumber('');
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App;
