const User = require('../models').User;
const Calendar = require('../models').Calendar;
const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

    signup(req, res) {
        return User
            .create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    login(req, res) {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
            if (!user) {
                return res.status(404).send('User Not Found.');
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
            }

            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, accessToken: token });

        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        });
    },

    addWithCalendars(req, res) {
        return User
            .create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
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