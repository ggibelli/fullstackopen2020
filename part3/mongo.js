const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Plese provide password as argument: node mongo.js password')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackopen:${password}@cluster0-5rxlk.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to the phonebook`)
    mongoose.connection.close()
  })
}
else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(note => console.log(note.name, note.number))
    mongoose.connection.close()
  })
}






