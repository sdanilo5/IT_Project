const express = require('express');
const router = express.Router();

const loginController = require('./../controllers/login-controller');

router.route('/')
    .get(loginController.login);

module.exports = router;