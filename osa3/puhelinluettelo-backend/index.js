require('dotenv').config();
const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

morgan.token('req-data', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-data'));
app.use(cors());
app.use(express.static('build'));

app.get('/info', (req, res) => {
  Person.find({}).then((result) => {
    res.send(`<p>Phonebook has info for ${result.length} people</>
              <p>${Date()}</>`);
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  console.log('id', req.params.id, typeof req.params.id);
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end();
  })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const person = { name: req.body.name, number: req.body.number };
  console.log(req.body);
  Person.findByIdAndUpdate(req.params.id, person, { new: 'true' })
    .then((updatedPerson) => {
      if (updatedPerson) res.json(updatedPerson);
      else res.status(404).end();
    })
    .catch((error) => next(error));
});
// eslint-disable-next-line
app.post('/api/persons', (req, res, next) => {
  const { body } = req;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing' });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
// eslint-disable-next-line
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' });
  if (error.name === 'ValidationError') return response.status(400).send({ error: error.message });

  next(error);
};
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
