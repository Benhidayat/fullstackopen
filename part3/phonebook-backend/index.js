const express = require('express');
const app = express();
const PORT = 3001;

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World</h1>')
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    const date = new Date();
    const amount = persons.length;
    
    res.send(`<div>
        <p>Phonebook has info for ${amount} people</p>
        <p>${date}</p>
    </div>`)

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});