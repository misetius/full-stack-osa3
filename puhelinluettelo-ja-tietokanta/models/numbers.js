const mongoose = require("mongoose")



const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonenumberSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhoneNumber = mongoose.model('Phonenumber', phonenumberSchema)


phonenumberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('PhoneNumber', phonenumberSchema)

