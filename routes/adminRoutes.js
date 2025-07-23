const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRole = require('../middlewares/authorizeRole');
const adminController = require('../controllers/adminController');

// Endpoint dashboard hanya untuk admin (roleId = 1)
router.get('/dashboard', authenticateToken, authorizeRole(1), adminController.dashboard);

// Endpoint antrian yang harus di approve oleh admin (roleId = 1)
router.get('/agronomists/pending', authenticateToken, authorizeRole(1), adminController.getPendingAgronomists);

// Endpoint  admin approve role agronomist
router.patch('/agronomists/approve/:id', authenticateToken, authorizeRole(1), adminController.approveAgronomist);

module.exports = router;
