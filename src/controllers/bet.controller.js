const betService = require('../services/bet.service');

const create = async (req, res) => {
  try {
    const bet = await betService.createBet(req.body);
    res.status(201).json(bet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const bets = await betService.getAllBets();
    res.json(bets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const bet = await betService.getBetById(req.params.id);
    res.json(bet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const bet = await betService.updateBet(req.params.id, req.body);
    res.json(bet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await betService.deleteBet(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
};