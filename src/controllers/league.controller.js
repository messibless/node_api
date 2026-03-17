const leagueService = require('../services/league.service');

const create = async (req, res) => {
  try {
    const league = await leagueService.createLeague(req.body);
    res.status(201).json(league);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const leagues = await leagueService.getAllLeagues();
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPopular = async (req, res) => {
  try {
    const popular = await leagueService.getPopularLeagues();
    res.json(popular);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeaguesAndCountries = async (req, res) => {
  try {
    const data = await leagueService.getLeaguesAndCountriesForUI();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getPopular,
  getLeaguesAndCountries   // endpoint maalum kwa hii UI list
};