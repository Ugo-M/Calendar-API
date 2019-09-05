const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ugo-m_m5301',
  host: 'postgresql-ugo-m.alwaysdata.net',
  database: 'ugo-m_m5301',
  password: 'Abc.123',
  port: 5432,
})

const getDepartements = (request, response) => {
  pool.query('SELECT * FROM departement', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPersonnel = (request, response) => {
  pool.query('SELECT * FROM personnel', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createDepartement = (request, response) => {
  const { name} = request.body

  pool.query('INSERT INTO departement (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Departement added with name: ${name}`)
  })
}

const createPerson = (request, response) => {
  const { name, firstname, birthdate, departement } = request.body

  pool.query('INSERT INTO personnel (name, firstname, birthdate, departement) VALUES ($1, $2, $3, $4)', [name, firstname, birthdate, departement], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Personne added with name: ${name}`)
  })
}

module.exports = {
getDepartements,
getPersonnel,
createPerson,
createDepartement,
}