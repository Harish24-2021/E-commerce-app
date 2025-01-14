const express = require('express')

const { getAllUsers, createUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/authenticationController');

const router = express.Router();
router.post('/login', loginUser)




module.exports = router;
