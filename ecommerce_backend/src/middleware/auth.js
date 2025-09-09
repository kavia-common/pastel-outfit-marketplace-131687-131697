'use strict';

const store = require('../data/mockStore');

/**
 * Mock authentication middleware.
 * Reads Bearer token from Authorization header and attaches req.userId if valid.
 */
function authOptional(req, res, next) {
  try {
    const authHeader = req.get('authorization') || '';
    const [scheme, token] = authHeader.split(' ');
    if (scheme === 'Bearer' && token && store.sessions.has(token)) {
      req.userId = store.sessions.get(token);
    }
    next();
  } catch (e) {
    next();
  }
}

/**
 * Require auth middleware: blocks if no valid token present.
 */
function requireAuth(req, res, next) {
  const authHeader = req.get('authorization') || '';
  const [scheme, token] = authHeader.split(' ');
  if (scheme === 'Bearer' && token && store.sessions.has(token)) {
    req.userId = store.sessions.get(token);
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = {
  authOptional,
  requireAuth,
};
