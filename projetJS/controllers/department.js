const Department = require('../models').Department;
const Person = require('../models').Person;

module.exports = {
    list(req, res) {
        return Department
            .findAll(/*{
                include: [{
                    model: Person,
                    as: 'persons'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Person, as: 'persons' }, 'createdAt', 'DESC'],
                ],
            }*/)
            .then((departments) => res.status(200).send(departments))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Department
            .findByPk(req.params.id, {
                include: [{
                    model: Person,
                    as: 'persons'
                }],
            })
            .then((department) => {
                if (!department) {
                    return res.status(404).send({
                        message: 'Department Not Found',
                    });
                }
                return res.status(200).send(department);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Department
            .create({
                department_name: req.body.department_name,
            })
            .then((department) => res.status(201).send(department))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Department
            .findByPk(req.params.id, {
                include: [{
                    model: Person,
                    as: 'persons'
                }],
            })
            .then(department => {
                if (!department) {
                    return res.status(404).send({
                        message: 'Department Not Found',
                    });
                }
                return department
                    .update({
                        department_name: req.body.department_name || department.department_name,
                    })
                    .then(() => res.status(200).send(department))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Department
            .findByPk(req.params.id)
            .then(department => {
                if (!department) {
                    return res.status(400).send({
                        message: 'Department Not Found',
                    });
                }
                return department
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    /*addWithPersons(req, res) {
        return Department
            .create({
                department_name: req.body.department_name,
                persons: req.body.persons,
            }, {
                include: [{
                    model: Person,
                    as: 'persons'
                }]
            })
            .then((department) => res.status(201).send(department))
            .catch((error) => res.status(400).send(error));
    },*/
};