const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/departements', db.getDepartements)
app.post('/departements', db.createDepartement)
app.get('/personnel', db.getPersonnel)
app.post('/personnel', db.createPerson)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


// requetes curl :

//curl --data "name=doe&firstname=john&birthdate=2000-01-01&departement=Informatique" http://localhost:3000/personnel/

//curl --data "name=test" http://localhost:3000/departements/