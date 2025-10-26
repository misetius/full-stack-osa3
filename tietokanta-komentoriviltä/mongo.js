const mongoose = require("mongoose")

if (process.argv.length < 2){
    console.log('give at least password as argument')
  process.exit(1)


}





if (process.argv.length === 5){


    const password = process.argv[2]

const url = `mongodb+srv://mihail:${password}@cluster0.yvsvton.mongodb.net/phonenumbersApp`

mongoose.set('strictQuery', false)

console.log(mongoose.connect(url))

const phonenumberSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhoneNumber = mongoose.model('Phonenumber', phonenumberSchema)

    const name = process.argv[3]
    const phonenumber = process.argv[4]
    console.log(name)
    console.log(phonenumber)
    const number = new PhoneNumber({
        name: name,
        number: phonenumber,
    })

    number.save().then(result => {
        console.log("added", name, "number", phonenumber, "to phonebook")
        mongoose.connection.close()
    })


}

if (process.argv.length === 3){

    
    const password = process.argv[2]

const url = `mongodb+srv://mihail:${password}@cluster0.yvsvton.mongodb.net/phonenumbersApp`

mongoose.set('strictQuery', false)

console.log(mongoose.connect(url))

const phonenumberSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhoneNumber = mongoose.model('Phonenumber', phonenumberSchema)

PhoneNumber.find({}).then(result => {
    result.forEach(number => {
        console.log(number.name, number.number)
    })
    mongoose.connection.close()
})

}
