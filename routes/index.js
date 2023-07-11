var express = require('express');
const { user_register, user_login } = require('../controller/LoginController');
var router = express.Router();

router.get('/register', user_register);
router.get('/', user_login);

module.exports = router;
