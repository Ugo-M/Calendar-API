const Event = require('../models').Event;
const Calendar = require('../models').Calendar;

module.exports = {
    list(req, res) {
        return Event
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
            .then((events) => res.status(200).send(events))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Event
            .findByPk(req.params.id, {
                include: [{
                    model: Event,
                    as: 'event'
                }],
            })
            .then((event) => {
                if (!event) {
                    return res.status(404).send({
                        message: 'Event Not Found',
                    });
                }
                return res.status(200).send(event);
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return Event
            .create({
                event_name: req.body.event_name,
                event_beginning: req.body.event_beginning,
                event_end: req.body.event_end,
                event_type: req.body.event_type,
            })
            .then((event) => res.status(201).send(event))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Event
            .findByPk(req.params.id, {
                include: [{
                    model: Event,
                    as: 'event'
                }],
            })
            .then(event => {
                if (!event) {
                    return res.status(404).send({
                        message: 'Event Not Found',
                    });
                }
                return event
                    .update({
                        event_name: req.body.event_name || classroom.event_name,
                    })
                    .then(() => res.status(200).send(event))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Event
            .findByPk(req.params.id)
            .then(event => {
                if (!event) {
                    return res.status(400).send({
                        message: 'Event Not Found',
                    });
                }
                return event
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};