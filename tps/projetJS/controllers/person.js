const Person = require('../models').Person;
const Department = require('../models').Department;

module.exports = {
    list(req, res) {
        return Person
            .findAll(/*{
                include: {
                    model: Department,
                    as: 'department'
                },
                order: ['createdAt', 'DESC'],
            }*/)
            .then((persons) => res.status(200).send(persons))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Person
            .findByPk(req.params.id, {
                /*include: [{
                    model: Department,
                    as: 'department'
                }],*/
            })
            .then((person) => {
                if (!person) {
                    return res.status(404).send({
                        message: 'Person Not Found',
                    });
                }
                return res.status(200).send(person);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Person
            .create({
                department_id: req.body.department_id,
                person_name: req.body.person_name,
                person_firstname: req.body.person_firstname,
            })
            .then((person) => res.status(201).send(person))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Person
            .findByPk(req.params.id, {
                include: [{
                    model: Department,
                    as: 'department'
                }],
            })
            .then(person => {
                if (!person) {
                    return res.status(404).send({
                        message: 'Person Not Found',
                    });
                }
                return person
                    .update({
                        person_name: req.body.person_name || department.person_name,
                    })
                    .then(() => res.status(200).send(person))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Person
            .findByPk(req.params.id)
            .then(person => {
                if (!person) {
                    return res.status(400).send({
                        message: 'Person Not Found',
                    });
                }
                return person
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};