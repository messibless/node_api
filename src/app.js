const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// Import configs
const { createSequelizeInstance, connectDatabase } = require('./config/database');

// Import models
const { defineUserModel, createUserMethods } = require('./models/user.model');

// Import repositories
const createUserRepository = require('./repositories/user.repository');

// Import services
const createAuthService = require('./services/auth.service');

// Import controllers
const createAuthController = require('./controllers/auth.controller');

// Import middleware
const createAuthMiddleware = require('./middleware/auth.middleware');

// Import routes
const createAuthRoutes = require('./routes/auth.routes');

// Import error handler
const { errorHandler } = require('./utils/errors');

/**
 * Create and configure app
 */
const createApp = async () => {
  const app = express();

  // Basic middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize database
  const sequelize = createSequelizeInstance();
  await connectDatabase(sequelize);

  // Initialize models
  const UserModel = defineUserModel(sequelize);
  createUserMethods(UserModel);

  // Initialize repository
  const userRepository = createUserRepository(UserModel);

  // Initialize services
  const authService = createAuthService(userRepository);

  // Initialize controllers
  const authController = createAuthController(authService);

  // Initialize middleware
  const authMiddleware = createAuthMiddleware(userRepository);

  // Initialize routes
  const authRoutes = createAuthRoutes(authController, authMiddleware);

  // Use routes
  app.use('/api/auth', authRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      database: sequelize.isAuthenticated() ? 'connected' : 'disconnected'
    });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  });

  // Error handler
  app.use(errorHandler);

  return app;
};

module.exports = createApp;