

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// Load specific .env file
// Force Node process to use your timezone
process.env.APP_TZ = process.env.APP_TZ || 'Africa/Dar_es_Salaam';

const PORT = process.env.PORT || 5000;
const authRoutes = require('./src/routes/auth.routes');


router.get('/profile', authenticate, (req, res) => {
    res.json({
      message: 'Protected route',
      user: req.user
    });
  });
const { initModels, sequelize } = require('./src/models');
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(helmet());
app.use(cors());

const start= async () => {
  try {
    await sequelize.authenticate()
    console.log('MariaDB connected successfully');
    await initModels();
    console.log('Database models synchronized');
    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    // Readiness endpoint
    app.get('/ready', async (req, res) => {
      const status = { db: 'unknown', redis: 'unknown', rabbitmq: 'unknown' };
      let allOk = true
      res.status(allOk ? 200 : 503).json({
        status: allOk ? 'ready' : 'not ready',
        timestamp: new Date().toISOString(),
        details: status
      });
    });


      app.listen(PORT, () => {
        console.log(`Auth Service running on port ${PORT}`);
      });

      app.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${PORT} is already in use`);
        } else {
          console.error('Server error:', err.message || err);
        }
        process.exit(1);
      });


  } catch (error) {
    // console.error('Unable to connect to DB:', error.message);
    process.exit(1);
  }
}

start()
// app.use(GlobalExceptionsHandler);
