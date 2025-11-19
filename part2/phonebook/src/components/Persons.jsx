import Person from "./Person";
import personService from '../services/persons';

const Persons = ({ persons, setPersons }) => {

    const handleDelete = (id) => {
        const person = persons.find(p => p.id === id);
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.deletePerson(id)
                .then(res => {
                    console.log(`this ${res.name} and ${res.id} has been deleted`)
                    const filteredPerson = persons.filter(p => p.id !== res.id);
                    setPersons(filteredPerson);
                })
        }
        
    };
    return (
        persons.map(person => 
            <Person 
                key={person.name} 
                name={person.name} 
                number={person.number}
                deletePerson={() => handleDelete(person.id)}
            />
        )
    )
};

export default Persons;
