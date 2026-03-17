require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { sequelize, initModels } = require('./src/models');  // adjust if you use initModels separately
const betRoutes = require('./src/routes/bet.routes');
const footballRoutes = require('./src/routes/football.routes');
const liveRoutes = require('./src/routes/live.routes');
const efootballRoutes = require('./src/routes/efootball.routes');
const tennisRoutes = require('./src/routes/tennis.routes');
const basketballRoutes = require('./src/routes/basketball.routes');
const balanceRoutes = require('./src/routes/balance.routes');
const authRoutes = require('./src/routes/auth.routes');
const leagueRoutes = require('./src/routes/league.routes');  // ← NEW

const { authenticate } = require('./src/middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   GLOBAL MIDDLEWARES
========================= */
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5174/admin-panel',  // keep for your admin
  // Add production domains later
];

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true
}));

app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use('/api/balance', balanceRoutes);
app.use('/api/tennis', tennisRoutes);
app.use('/api/efootball', efootballRoutes);
app.use('/api/basketball', basketballRoutes);
app.use('/api/live', liveRoutes);
app.use('/api/football', footballRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/leagues', leagueRoutes);  // ← NEW INTEGRATION

/* Protected Example */
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

/* Health Check */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

/* Global Error Handler (good practice) */
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

/* =========================
   START SERVER
========================= */
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    await initModels();  // Sync models and create tables
    console.log('✅ Models synchronized');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

start();