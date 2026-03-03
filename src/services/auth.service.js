const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require('../utils/jwt');

const registerUser = async (phone_number, password) => {

  const existingUser = await userRepository.findByPhone(phone_number);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser({
    phone_number,
    password: hashedPassword
  });

  return {
    id: user.id,
    phone_number: user.phone_number
  };
};

const loginUser = async (phone_number, password) => {

  const user = await userRepository.findByPhone(phone_number);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

 

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    id: user.id,
    phone_number: user.phone_number,
    accessToken,
    refreshToken
  };
 
};


const refreshAccessToken = async (refreshToken) => {

  if (!refreshToken) {
    throw new Error('Refresh token required');
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await userRepository.findById(decoded.id);

  if (!user) {
    throw new Error('User not found');
  }

  const newAccessToken = generateAccessToken(user);

  return {
    accessToken: newAccessToken
  };
};



module.exports = {
  refreshAccessToken,

  registerUser,
  loginUser
};