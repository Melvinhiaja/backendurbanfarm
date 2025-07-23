const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticateToken');
const authorizeRole = require('../middlewares/authorizeRole');
const farmerController = require('../controllers/farmerController');

const authenticateToken = require('../middlewares/authenticateToken');
router.get('/dashboard', authenticateToken, authorizeRole(2), farmerController.dashboard);
module.exports = router;
