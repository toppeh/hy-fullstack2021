const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model("Person", personSchema)

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.azjwj.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

if (process.argv.length==6){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: process.argv[5]
    })
    person.save().then(res => {
        console.log(`added ${person.name} number ${person.number} to phonebook`);
        mongoose.connection.close()
    })
} else if (process.argv.length==3){
    Person.find({}).then(res => {
        console.log("phonebook:");
        res.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
    })
} else {
    console.log("incorrect amount of arguments");
    mongoose.connection.close()
    process.exit(1)
}
