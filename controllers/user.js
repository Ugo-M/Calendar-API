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

    getByName(req, res) {
        console.log(req.body);
        return User
            .findOne({
                where:{
                    username: req.body.username,
                },
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

    getId(req, res) {
        return User
            .findOne({
                where:{
                    username: req.body.username,
                },
                attributes:['id'],
            })
            .then((id) => {
                if (!id) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(id);
            })
            .catch((error) => res.status(400).send(error));
    },

    signup(req, res) {
        if (req.body.username && req.body.password) {
            return User
                .create({
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, 8),
                })
                .then((user) => res.status(201).send("OK -> created user " + user.username))
                .catch((error) => res.status(400).send(error));
        }
        return res.status(400).send("missing arguments")
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
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({ auth: true, accessToken: token });

        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        });
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
        console.log("name : " + req.body.username);
        return User
            .findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send("User deleted"))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};