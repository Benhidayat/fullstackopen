const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = 3001;

let persons = [
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

app.use(express.json());
app.use(cors());

// define body token
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World</h1>')
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id);

    if (!person) return res.status(404).end()

    res.json(person);
});

// create  new entry
app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) return res.status(400).json({ error: 'name or number is missing'});

    const duplicate = persons.find(p => p.name === body.name);
    if (duplicate) return res.status(409).json({ error: "name already exist" });

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons.concat(person);
    res.status(201).json(person)
});

const generateId = () => {
    const id = Math.floor(Math.random() * (500 - 5) + 5);
    return String(id);
};

app.get('/info', (req, res) => {
    const date = new Date();
    const amount = persons.length;
    
    res.send(`<div>
        <p>Phonebook has info for ${amount} people</p>
        <p>${date}</p>
    </div>`)

});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});