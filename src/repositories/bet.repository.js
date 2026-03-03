const Bet = require('../models/bet.model');

const createBet = async (data) => {
  return await Bet.create(data);
};

const findAllBets = async () => {
  return await Bet.findAll({ order: [['createdAt', 'DESC']] });
};

const findBetById = async (id) => {
  return await Bet.findByPk(id);
};

const updateBet = async (id, data) => {
  await Bet.update(data, { where: { id } });
  return await findBetById(id);
};

const deleteBet = async (id) => {
  return await Bet.destroy({ where: { id } });
};

module.exports = {
  createBet,
  findAllBets,
  findBetById,
  updateBet,
  deleteBet
};