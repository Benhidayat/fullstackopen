import Person from "./Person";
import personService from '../services/persons';

const Persons = ({ persons, setPersons }) => {

    const handleDelete = (id) => {
        console.log(id);
        const person = persons.find(p => p.id === id);
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.deletePerson(id)
                .then(res => {
                    console.log(`this ${person.name} and ${person.id} has been deleted`)
                    const filteredPerson = persons.filter(p => p.id !== person.id);
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
