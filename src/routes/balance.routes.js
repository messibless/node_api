const express = require('express');
const router = express.Router();
const { fetchBalance, updateAmount } = require('../controllers/balance.controller');

/* GET current balance */
router.get('/', fetchBalance);

/* PATCH update amount */
router.patch('/', updateAmount);

module.exports = router;