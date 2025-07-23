const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticateToken');
const authorizeRole = require('../middlewares/authorizeRole');
const agronomistController = require('../controllers/agronomistController');

const authenticateToken = require('../middlewares/authenticateToken');
router.get('/dashboard', authenticateToken, authorizeRole(3), agronomistController.dashboard);
module.exports = router;
