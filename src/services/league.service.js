const leagueRepository = require('../repositories/league.repository');
const { Op } = require('sequelize');

const createLeague = async (data) => {
  // Optional: validation
  if (!data.name) throw new Error('League name is required');
  const existing = await leagueRepository.findByNameOrCode(data.name);
  if (existing) throw new Error('League already exists');

  return await leagueRepository.createLeague(data);
};

const getAllLeagues = async () => {
  return await leagueRepository.findAllLeagues();
};

const getPopularLeagues = async () => {
  return await leagueRepository.findPopularLeagues(10); // top 10
};

const getLeagueByIdentifier = async (identifier) => {
  const league = await leagueRepository.findByNameOrCode(identifier);
  if (!league) throw new Error('League not found');
  return league;
};

const updateLeagueMatchCount = async (leagueId, newCount) => {
  if (newCount < 0) throw new Error('Match count cannot be negative');
  return await leagueRepository.updateMatchCount(leagueId, newCount);
};

// Special method kwa UI yako: get structured data kama ulivyoonyesha
const getLeaguesAndCountriesForUI = async () => {
  const allLeagues = await leagueRepository.findAllLeagues();

  // Leagues section (popular + high count)
  const leaguesSection = allLeagues.filter(l => l.is_popular || l.match_count > 5);

  // Countries section
  const countriesData = await leagueRepository.findAllCountriesWithCounts();

  return {
    leagues: leaguesSection.map(l => ({
      name: l.name,
      flag: l.flag_emoji || '',
      match_count: l.match_count
    })),
    countries: countriesData.map(c => ({
      name: c.country,
      total_matches: parseInt(c.total_matches) || 0,
      // unaweza ku-add league_count if needed
    })).filter(c => c.total_matches > 0)
  };
};

module.exports = {
  createLeague,
  getAllLeagues,
  getPopularLeagues,
  getLeagueByIdentifier,
  updateLeagueMatchCount,
  getLeaguesAndCountriesForUI   // ← hii ndio key kwa frontend yako
};