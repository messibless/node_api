const League = require('../models/league.model');
const { Op, fn, col } = require('sequelize'); // ← fixed import

const createLeague = async (data) => {
  return await League.create(data);
};

const findAllLeagues = async () => {
  return await League.findAll({
    order: [
      ['is_popular', 'DESC'],
      ['match_count', 'DESC'],
      ['name', 'ASC']
    ]
  });
};

const findPopularLeagues = async (limit = 10) => {
  return await League.findAll({
    where: { is_popular: true },
    order: [['match_count', 'DESC'], ['name', 'ASC']],
    limit
  });
};

const findByNameOrCode = async (identifier) => {
  return await League.findOne({
    where: {
      [Op.or]: [              // ← was Sequelize.Op.or
        { name: identifier },
        { code: identifier }
      ]
    }
  });
};

const updateMatchCount = async (leagueId, newCount) => {
  await League.update({ match_count: newCount }, { where: { id: leagueId } });
  return await League.findByPk(leagueId);
};

const findAllCountriesWithCounts = async () => {
  return await League.findAll({
    attributes: [
      'country',
      [fn('SUM', col('match_count')), 'total_matches'],  // ← was Sequelize.fn, Sequelize.col
      [fn('COUNT', col('id')), 'league_count']
    ],
    group: ['country'],
    order: [[fn('SUM', col('match_count')), 'DESC']],
    raw: true
  });
};

module.exports = {
  createLeague,
  findAllLeagues,
  findPopularLeagues,
  findByNameOrCode,
  updateMatchCount,
  findAllCountriesWithCounts
};