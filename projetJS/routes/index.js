var express = require('express');
var router = express.Router();

const departmentController = require('../controllers').department;
const personController = require('../controllers').person;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/department', departmentController.list);
router.get('/api/department/:id', departmentController.getById);
router.post('/api/department', departmentController.add);
router.put('/api/department/:id', departmentController.update);
router.delete('/api/department/:id', departmentController.delete);
//router.post('/api/department/add_with_persons', departmentController.addWithPersons());

router.get('/api/person', personController.list);
router.get('/api/person/:id', personController.getById);
router.post('/api/person', personController.add);
router.put('/api/person/:id', personController.update);
router.delete('/api/person/:id', personController.delete);

module.exports = router;
