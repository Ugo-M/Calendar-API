const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/departments', db.getDepartments);
app.get('/departments/:name', db.getDepartmentByName);
app.get('/person', db.getPersonnel);
app.get('/person/:name', db.getPersonByName);

app.post('/departments', db.createDepartment);
app.post('/person', db.createPerson);

app.put('/departments/:id', db.updateDepartment);
app.put('/person/:id', db.updatePerson);

app.delete('/departments/:id', db.deleteDepartment);
app.delete('/person/:id', db.deletePerson);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});


// curl requests :

// INSERT
// curl --data "name=doe&firstname=john&department=Informatique" http://localhost:3000/person/
// curl --data "name=test" http://localhost:3000/departments/

// UPDATE
// le /6 correspond à l'id
// curl -X PUT -d "name=newname" http://localhost:3000/departments/6
// curl -X PUT -d "name=newname" -d "firstname=newfirstname" http://localhost:3000/person/6

// DELETE
// le /6 correspond à l'id
// curl -X "DELETE" http://localhost:3000/departments/6
// curl -X "DELETE" http://localhost:3000/person/6