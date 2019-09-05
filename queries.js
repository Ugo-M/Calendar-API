const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ugo-m_m5301',
  host: 'postgresql-ugo-m.alwaysdata.net',
  database: 'ugo-m_m5301',
  password: 'Abc.123',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM departement', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
getUsers,
}