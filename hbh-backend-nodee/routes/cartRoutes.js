const express = require('express');
const updateCart = require('../controllers/cartController');

const  router = express.Router();
router.post('/updateCart', updateCart)

module.exports = router;