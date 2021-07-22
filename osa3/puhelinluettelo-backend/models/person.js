const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;
console.log(`connecting to ${url}`);
mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String, required: true, unique: true, minLength: [3, 'Name must be atleast 3 characters long'],
  },
  number: { type: String, required: true, minLength: [8, 'Number must be atleast 8 digits long'] },
  id: String,
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // eslint-disable-line
    delete returnedObject._id; // eslint-disable-line
    delete returnedObject.__v; // eslint-disable-line
  },
});

module.exports = mongoose.model('Person', personSchema);
