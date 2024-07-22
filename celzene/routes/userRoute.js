//routes are where we write end points addrsses and bind them with function or logic
const express = require('express')
const router = express.Router();

const {protect , authorize} = require ('../middleware/auth')

const userController= require('../controller/userController')

console.log('Hi');
router.post('/users', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/data', protect,authorize('Admin'), userController.getAllUsers); 
router.put('/update/:id',userController.updateUserById);

module.exports = router;
