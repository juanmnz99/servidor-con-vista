
exports.isPremium = (req, res, next) => {
    if (req.user.role === 'premium') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied' });
  };
  