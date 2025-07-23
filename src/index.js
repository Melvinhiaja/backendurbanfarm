
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const sequelize = require('./db');
const authRoutes = require('../routes/authRoutes');
const adminRoutes = require('../routes/adminRoutes');
const farmerRoutes = require('../routes/farmerRoutes');
const agronomistRoutes = require('../routes/agronomistRoutes');

// Seeder
const userSeeder = require('../seeders/userSeeder');
const { User } = require('../models');

dotenv.config();
app.use(express.json());

//  Semua Routes 
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/agronomist', agronomistRoutes);

// Test route
app.get('/', (req, res) => {
  res.send(' melvin test ..');
});

const PORT = process.env.PORT || 3000;

// Database dan server runing
sequelize.sync().then(async () => {
  console.log(' Database connected...');
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error(' Unable to connect to the database:', err);
});
