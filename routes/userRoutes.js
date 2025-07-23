const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Register & Login (all user)
router.post('/register', userController.register);
router.post('/login', userController.login);

// Role admin
router.get('/users', authenticateToken, authorizeRoles(1), userController.getAllUsers);

// Role farmer
router.get('/farmer/dashboard', authenticateToken, authorizeRoles(2), (req, res) => {
  res.json({ message: 'Welcome, Farmer!' });
});

// Role agronomist
router.get('/agronomist/dashboard', authenticateToken, authorizeRoles(3), (req, res) => {
  res.json({ message: 'Welcome, Agronomist!' });
});

module.exports = router;
