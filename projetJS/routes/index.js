const express = require('express');
const router = express.Router();
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
const userController = require('../controllers').user;
const calendarController = require('../controllers').calendar;
const eventController = require('../controllers').event;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/auth/signup', [verifySignUp.checkDuplicateUserName], userController.signup);
router.post('/api/auth/login', userController.login);

router.get('/api/user', [authJwt.verifyToken], userController.list);
router.get('/api/user/id/:id', [authJwt.verifyToken], userController.getById);
router.get('/api/user/name/', [authJwt.verifyToken],userController.getByName);
router.get('/api/user/id/', [authJwt.verifyToken],userController.getId);
router.put('/api/user/:id', [authJwt.verifyToken], userController.update);
router.delete('/api/user', [authJwt.verifyToken], userController.delete);
router.post('/api/user', [authJwt.verifyToken], userController.addWithCalendars);

router.get('/api/calendar', [authJwt.verifyToken], calendarController.list);
router.get('/api/calendar/:id', [authJwt.verifyToken], calendarController.getById);
router.post('/api/calendar', [authJwt.verifyToken], calendarController.add);
router.put('/api/calendar/:id', [authJwt.verifyToken], calendarController.update);
router.delete('/api/calendar/:id', [authJwt.verifyToken], calendarController.delete);

router.get('/api/event', [authJwt.verifyToken], eventController.list);
router.get('/api/event/:id', [authJwt.verifyToken], eventController.getById);
router.post('/api/event', [authJwt.verifyToken], eventController.add);
router.put('/api/event/:id', [authJwt.verifyToken], eventController.update);
router.delete('/api/event/:id', [authJwt.verifyToken], eventController.delete);

module.exports = router;
