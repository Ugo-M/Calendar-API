const User = require('../models').User;
const Calendar = require('../models').Calendar;

module.exports = {
    list(req, res) {
        return User
            .findAll({
                include: [{
                    model: Calendar,
                    as: 'calendars'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Calendar, as: 'calendars' }, 'createdAt', 'DESC'],
                ],
            })
            .then((classrooms) => res.status(200).send(classrooms))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return User
            .findByPk(req.params.id, {
                include: [{
                    model: Calendar,
                    as: 'calendars'
                }],
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return User
            .create({
                username: req.body.username,
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    addWithCalendars(req, res) {
        return User
            .create({
                username: req.body.username,
                calendars: req.body.calendars,
            }, {
                include: [{
                    model: Calendar,
                    as: 'calendars'
                }]
            })
            .then((classroom) => res.status(201).send(classroom))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return User
            .findByPk(req.params.id, {
                include: [{
                    model: Calendar,
                    as: 'calendars'
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update({
                        username: req.body.username || user.username,
                    })
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};