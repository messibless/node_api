const User = require('../models/user.model');

const createUser = async (data) => {
  return await User.create(data);
};

const findByPhone = async (phone_number) => {
  return await User.findOne({ where: { phone_number } });
};

const findById = async (id) => {
  return await User.findByPk(id);
};

module.exports = {
  createUser,
  findByPhone,
  findById,
};