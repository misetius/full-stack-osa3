const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
var morgan = require('morgan')


app.use(morgan('tiny'))

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    }
  ]

app.get("/api/persons", (request, response) =>
    response.json(persons)

)

app.get("/api/info", (request, response) =>{
    const aika = new Date()
    const pituus = persons.length
    response.send(`<p>Phonebook has info for ${pituus} people</p><p>${aika}</p>`)

  }
)

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if(person){
  response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()

})

app.post('/api/persons', (request, response) => {
  const random_id = Math.floor(Math.random() * 1000)
  const body = request.body
  console.log(body)

    if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name missing or number missing' 
    })
  }

    const list = persons.map(p => p.name)

  if(list.includes(body.name)){
      return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const personandnumber = {
    name: body.name,
    number: body.number, 
    id: random_id
  }

  console.log(personandnumber)
  persons = persons.concat(personandnumber)

  response.json(personandnumber)
}

)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})