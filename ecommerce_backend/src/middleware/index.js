const { authOptional, requireAuth } = require('./auth');

// This file will export middleware as the application grows
module.exports = {
  authOptional,
  requireAuth,
};
