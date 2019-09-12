const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ugo-m_m5301',
    host: 'postgresql-ugo-m.alwaysdata.net',
    database: 'ugo-m_m5301',
    password: 'Abc.123',
    port: 5432,
});

const getDepartments = (request, response) => {
    pool.query('SELECT * FROM department', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getDepartmentByName = (request, response) => {
    const name = request.params.name;

    pool.query('SELECT * FROM department WHERE name = $1', [name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getPerson = (request, response) => {
    pool.query('SELECT * FROM person', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getPersonByName = (request, response) => {
    const name = request.params.name;

    pool.query('SELECT * FROM person WHERE name = $1', [name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const createDepartment = (request, response) => {
    const {name} = request.body;

    pool.query('INSERT INTO department (name) VALUES ($1)', [name], (error) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Department added with name: ${name}`)
    })
};

const createPerson = (request, response) => {
    const { name, firstname, department } = request.body;

    pool.query('INSERT INTO person (name, firstname, department) VALUES ($1, $2, $3)', [name, firstname, department], (error) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Person added with name: ${name}`)
    })
};

const updateDepartment = (request, response) => {
    const id = parseInt(request.params.id);
    const {name} = request.body;

    pool.query('UPDATE department SET name = $1 WHERE id = $2', [name, id], (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
};

const updatePerson = (request, response) => {
    const id = parseInt(request.params.id);
    const {name, firstname} = request.body;

    pool.query('UPDATE person SET name = $1, firstname = $2 WHERE id = $3', [name, firstname, id], (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
};

const deleteDepartment = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE from department WHERE id = $1', [id], (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
};

const deletePerson = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE from person WHERE id = $1', [id], (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
};

module.exports = {
    getDepartments,
    getPerson,
    getPersonByName,
    getDepartmentByName,
    createPerson,
    createDepartment,
    updateDepartment,
    updatePerson,
    deleteDepartment,
    deletePerson,
};