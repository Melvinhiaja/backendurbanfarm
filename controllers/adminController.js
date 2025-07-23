const { User } = require('../models');

module.exports = {
  dashboard: async (req, res) => {
    try {
      res.status(200).json({ message: 'Welcome to admin dashboard' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getPendingAgronomists: async (req, res) => {
    try {
      const pendingUsers = await User.findAll({
        where: {
          roleId: 3, // Agronomist
          status: 'pending_approval'
        },
        attributes: ['id', 'name', 'email', 'status']
      });

      res.status(200).json({ pendingUsers });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  approveAgronomist: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user || user.roleId !== 3 || user.status !== 'pending_approval') {
        return res.status(404).json({ message: 'User not found or already approved' });
      }

      user.status = 'active';
      await user.save();

      res.status(200).json({ message: 'Agronomist approved successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
