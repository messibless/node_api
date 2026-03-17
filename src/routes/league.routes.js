const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/league.controller');

// Public endpoints
router.get('/', leagueController.getAll);
router.get('/popular', leagueController.getPopular);
router.get('/ui-data', leagueController.getLeaguesAndCountries);  // ← frontend itatumia hii moja kwa moja

// Admin-only (add auth middleware later)
router.post('/', leagueController.create);

module.exports = router;