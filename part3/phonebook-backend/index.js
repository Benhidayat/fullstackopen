const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.use(express.static('./dist'));
app.use(express.json());
app.use(cors());

// define body token
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body');
);

app.get('/', (req, res) => {
  res.status(200).send("<h1>Hello World</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (!person) return res.status(404).end();
      res.json(person);
    })
    .catch((error) => next(error));
});

// create  new entry
app.post("/api/persons", async (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number)
    return res.status(400).json({ error: "name or number is missing" });

  const duplicate = await Person.find({ name: body.name }).then(
    (person) => person
  );
  if (duplicate.length > 0)
    return res.status(409).json({ error: "name already exist" });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  const date = new Date();
  const persons = Person.find({}).then((persons) => persons);
  const amount = persons.length;

  res.send(`<div>
        <p>Phonebook has info for ${amount} people</p>
        <p>${date}</p>
    </div>`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id).then(() => {
    res.status(204).end();
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      if (!person) return res.status(404).end();

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => res.json(updatedPerson));
    })
    .catch((error) => next(error));
});

// Unknown & Error
const unknownEndpoint = (req, res, next) => {
  res.status(404).end();
};

app.use(unknownEndpoint);

const errorMiddleware = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError")
    return res.status(400).send({ error: "malformed id" });
  if (err.name === "ValidationError")
    return res.status(400).json({ error: err.message });
  next(err);
};

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
