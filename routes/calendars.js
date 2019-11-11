const express = require('express');
const router = express.Router();
const authJwt = require('./verifyJwtToken');
const calendarController = require('../controllers').calendar;

router.get('', [authJwt.verifyToken], calendarController.list);
router.get('/:id', [authJwt.verifyToken], calendarController.getById);
router.post('', [authJwt.verifyToken], calendarController.add);
router.put('/:id', [authJwt.verifyToken], calendarController.update);
router.delete('/:id', [authJwt.verifyToken], calendarController.delete);

module.exports = router;