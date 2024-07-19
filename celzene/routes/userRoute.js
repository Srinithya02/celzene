
const express = require('express')
const router = express.Router();
const userController= require('../controller/userController')

console.log('Hi');
router.post('/users', userController.createUser);

module.exports = router;
