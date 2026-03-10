// services/bet.service.js
const betRepository = require('../repositories/bet.repository');

// CREATE Bet
// CREATE Bet
const createBet = async (data) => {

  const stake = parseFloat(data.stake) || 0;

  const odds1 = parseFloat(data.oddsMatche1) || 1;
  const odds2 = parseFloat(data.oddsMatche2) || 1;

  // Calculate total odds (Accumulator logic)
  const totalOdds = odds1 * odds2;

  // Calculate payout
  const payout = stake * totalOdds;


  // Attach calculated fields
  data.total_odds = totalOdds.toFixed(2);
  data.payout = payout.toFixed(2);

  const bet = await betRepository.createBet(data);

  return bet;
};

// APPROVE / SETTLE BET
const approveBet = async (betId, resultStatus) => {

  const bet = await betRepository.findBetById(betId);

  if (!bet) {
    throw new Error("Bet not found");
  }

  if (bet.status === "SETTLED") {
    throw new Error("Bet already settled");
  }

  // Determine result
  let result;
  if (resultStatus === "WON") {
    result = "WON";
  } else if (resultStatus === "LOST") {
    result = "LOST";
  } else {
    throw new Error("Invalid result type");
  }

  // Update bet
  bet.result = result;
  bet.status = "SETTLED";

  await bet.save();

  return bet;
};

// GET all bets
const getAllBets = async () => {
  const bets = await betRepository.findAllBets();
  return bets; // return raw DB objects
};

// GET bet by ID
const getBetById = async (id) => {
  const bet = await betRepository.findBetById(id);
  if (!bet) throw new Error('Bet not found');
  return bet;
};

// UPDATE Bet (partial allowed)
const updateBet = async (id, data) => {
  const bet = await betRepository.findBetById(id);
  if (!bet) throw new Error('Bet not found');

  // Merge existing bet with updated fields
  const updatedData = { ...bet.dataValues, ...data };

  // Optionally recalc total_odds and payout if stake or odds changed
  if (data.stake || data.oddsMatche1 || data.oddsMatche2) {
    let total_odds = 1;
    if (updatedData.oddsMatche1) total_odds *= parseFloat(updatedData.oddsMatche1);
    if (updatedData.oddsMatche2) total_odds *= parseFloat(updatedData.oddsMatche2);
    updatedData.total_odds = total_odds.toFixed(2);
    updatedData.payout = updatedData.stake ? parseFloat(updatedData.stake) * total_odds : 0;
  }

  await betRepository.updateBet(id, updatedData);
  const updatedBet = await betRepository.findBetById(id);
  return updatedBet; // return raw
};

// DELETE Bet
const deleteBet = async (id) => {
  const bet = await betRepository.findBetById(id);
  if (!bet) throw new Error('Bet not found');

  await betRepository.deleteBet(id);
  return { message: 'Bet deleted successfully' };
};

module.exports = {
  createBet,
  getAllBets,
  getBetById,
  updateBet,
  deleteBet,
  approveBet
};