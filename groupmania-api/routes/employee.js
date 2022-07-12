
const express = require('express');
const router = express.Router();

const employeeCtrl = require('../controllers/employee');

router.post('/signup', employeeCtrl.signup);
router.post('/login', employeeCtrl.login);

//export du router
module.exports = router;