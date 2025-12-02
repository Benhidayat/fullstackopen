import { useEffect, useState } from "react";
import personService from "./services/persons";
import ContactForm from "./components/ContactForm";
import Persons from "./components/Persons";
import FilterContacts from "./components/FilterContacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [errSelector, setErrSelector] = useState(true);

  // fetch persons from server
  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // show persons after search applied
  const filteredPersons = persons?.filter((person) => {
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

    const personObj = {
      name: newName,
      number: newNumber,
    };

    const dupe = persons.find((person) => person.name === newName);

    if (dupe) {
      if (
        window.confirm(
          `${dupe.name} is already added to phonebook. replace the old number with a new one?`
        )
      ) {
        personService
          .updatePerson(dupe.id, personObj)
          .then((res) => {
            console.log(res);
            const newPersons = persons.map((p) => {
              return {
                ...p,
                number: p.id === res.id ? res.number : p.number,
              };
            });
            console.log(newPersons);
            setPersons(newPersons);
          })
          .catch((error) => {
            console.log("error", error?.response?.data?.error);
            setNotifMessage(
              `${dupe.name} has already been removed from the server`
              // error.response.data.error
            );
            setErrSelector(true);
            setTimeout(() => {
              setNotifMessage(null);
            }, 5000);
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    personService
      .createNewPerson(personObj)
      .then((returnedPerson) => {
        console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotifMessage(`Added ${returnedPerson.name}`);
        setErrSelector(false);
        setTimeout(() => {
          setNotifMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setNotifMessage(error.response.data.error);
        setErrSelector(true);
        setTimeout(() => {
          setNotifMessage(null);
        }, 5000);
      });
  };

  console.log(notifMessage);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} selector={errSelector} />
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
  );
};

export default App;
