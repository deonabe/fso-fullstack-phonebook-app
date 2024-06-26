const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/info", (request, response) => {
    const date = new Date()
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p> 
    <p>${date} </p>
    `)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const uniqueID = () => {
    return Math.floor(Math.random() * Date.now())
}

app.post("/api/persons", (request, response) => {
    const body = request.body
    if (!body.name){
        return response.status(400).json({error: 'name is missing'})
    }
    if (!body.number){
        return response.status(400).json({error: 'number is missing'})
    }
    if(persons.find(person => person.name === body.name)){
        return response.status(400).json({error: `${body.name} already exists in the phonebook`})
    }
    const newPerson = {
        name: body.name,
        number: body.number,
        id: uniqueID()
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
