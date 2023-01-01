const express = require('express');
const welcomeController = require('./../controllers/welcome.controller');
const router = express.Router();

router.route('/').get(welcomeController.example);
module.exports = router;
