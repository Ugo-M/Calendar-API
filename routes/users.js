const express = require('express');
const router = express.Router();
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
const userController = require('../controllers').user;

router.post('/auth/signup', [verifySignUp.checkDuplicateUserName], userController.signup);
router.post('/auth/login', userController.login);

router.get('', [authJwt.verifyToken], userController.list);
router.get('/id/:id', [authJwt.verifyToken], userController.getById);
router.get('/name/:name', [authJwt.verifyToken],userController.getByName);
router.get('/id', [authJwt.verifyToken],userController.getId);
router.put('/:id', [authJwt.verifyToken], userController.update);
router.delete('', [authJwt.verifyToken], userController.delete);

module.exports = router;