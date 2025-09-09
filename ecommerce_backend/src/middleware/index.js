const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// PUBLIC_INTERFACE
function requireAuth(req, res, next) {
  /** Ensure a valid JWT is provided in Authorization header. */
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (e) {
    return res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
}

// PUBLIC_INTERFACE
function optionalAuth(req, _res, next) {
  /** Attach user from JWT if provided; otherwise continue. */
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
    } catch (_e) {
      // ignore invalid token for optional
    }
  }
  next();
}

// PUBLIC_INTERFACE
function validateBody(requiredFields = []) {
  /** Validate presence of required fields in JSON body. */
  return (req, res, next) => {
    const missing = requiredFields.filter((f) => !(f in req.body));
    if (missing.length) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }
    next();
  };
}

module.exports = {
  requireAuth,
  optionalAuth,
  validateBody
};
