const Calendar = require('../models').Calendar;
const User = require('../models').User;
const Event = require('../models').Event;

module.exports = {
    list(req, res) {
        return Calendar
            .findAll({
                include: [{
                    model: User,
                    as: 'user'
                },{
                    model: Event,
                    as: 'events'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Event, as: 'events' }, 'createdAt', 'DESC'],
                ],
            })
            .then((calendars) => res.status(200).send(calendars))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Calendar
            .findByPk(req.params.id, {
                include: [{
                    model: User,
                    as: 'user'
                },{
                    model: Event,
                    as: 'events'
                }],
            })
            .then((calendar) => {
                if (!calendar) {
                    return res.status(404).send({
                        message: 'Calendar Not Found',
                    });
                }
                return res.status(200).send(calendar);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Calendar
            .create({
                user_id: req.body.user_id,
                calendar_name: req.body.calendar_name,
            })
            .then((calendar) => res.status(201).send(calendar))
            .catch((error) => res.status(400).send(error));
    },

    addEvent(req, res) {
        return Calendar
            .findByPk(req.body.calendar_id, {
                include: [{
                    model: User,
                    as: 'user'
                },{
                    model: Event,
                    as: 'events'
                }],
            })
            .then((calendar) => {
                if (!calendar) {
                    return res.status(404).send({
                        message: 'Calendar Not Found',
                    });
                }
                Event.findByPk(req.body.event_id).then((event) => {
                    if (!event) {
                        return res.status(404).send({
                            message: 'Event Not Found',
                        });
                    }
                    calendar.addEvent(event);
                    return res.status(200).send(calendar);
                })
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Calendar
            .findByPk(req.params.id, {
                include: [{
                    model: User,
                    as: 'user'
                },{
                    model: Event,
                    as: 'events'
                }],
            })
            .then(calendar => {
                if (!calendar) {
                    return res.status(404).send({
                        message: 'Calendar Not Found',
                    });
                }
                return calendar
                    .update({
                        calendar_name: req.body.calendar_name || user.calendar_name,
                    })
                    .then(() => res.status(200).send(calendar))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Calendar
            .findByPk(req.params.id)
            .then(calendar => {
                if (!calendar) {
                    return res.status(400).send({
                        message: 'Calendar Not Found',
                    });
                }
                return calendar
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};