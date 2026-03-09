const express = require('express');
const router = express.Router();
const betController = require('../controllers/bet.controller');

router.post('/',  betController.create);
router.get('/',  betController.getAll);
router.get('/:id',  betController.getOne);
router.put('/:id',  betController.update);
router.delete('/:id',  betController.remove);
// 🔥 NEW ROUTE - Approve / Settle Bet
router.patch('/:id/approve', betController.approveBetController);

module.exports = router;