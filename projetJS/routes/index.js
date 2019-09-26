const express = require('express');
var router = express.Router();

const userController = require('../controllers').user;
const calendarController = require('../controllers').calendar;
const eventController = require('../controllers').event;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);
router.post('/api/user', userController.addWithCalendars);

router.get('/api/calendar', calendarController.list);
router.get('/api/calendar/:id', calendarController.getById);
router.post('/api/calendar', calendarController.add);
router.put('/api/calendar/:id', calendarController.update);
router.delete('/api/calendar/:id', calendarController.delete);
router.post('/api/calendar/add_event', calendarController.addEvent);

router.get('/api/event', eventController.list);
router.get('/api/event/:id', eventController.getById);
router.post('/api/event', eventController.add);
router.put('/api/event/:id', eventController.update);
router.delete('/api/event/:id', eventController.delete);

module.exports = router;
