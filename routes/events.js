const express = require('express');
const router = express.Router();
const authJwt = require('./verifyJwtToken');
const eventController = require('../controllers').event;

router.get('', [authJwt.verifyToken], eventController.list);
router.get('/:id', [authJwt.verifyToken], eventController.getById);
router.post('', [authJwt.verifyToken], eventController.add);
router.put('/:id', [authJwt.verifyToken], eventController.update);
router.delete('/:id', [authJwt.verifyToken], eventController.delete);

module.exports = router;