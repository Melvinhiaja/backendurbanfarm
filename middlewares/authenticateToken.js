const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
    console.log(decoded);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid' });
      console.log('Payload dari token:', payload);


    try {
const user = await User.findByPk(payload.id);
      if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat verifikasi user' });
    }
  });
};

module.exports = authenticateToken;
