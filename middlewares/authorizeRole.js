const authorizeRole = (roleId) => {
  return (req, res, next) => {
    if (req.user.roleId !== roleId) {
      return res.status(403).json({ message: 'Akses ditolak' });
    }
    next();
  };
};

module.exports = authorizeRole;
