/**
 * Auth controller with signup/login.
 */
const authService = require('../services/auth');

// PUBLIC_INTERFACE
async function signup(req, res, next) {
  /** Create a new user account. Returns JWT and profile. */
  try {
    const { name, email, password } = req.body;
    const result = await authService.signup({ name, email, password });
    res.status(201).json({ status: 'ok', ...result });
  } catch (e) {
    e.status = e.message.includes('already') ? 409 : 400;
    next(e);
  }
}

// PUBLIC_INTERFACE
async function login(req, res, next) {
  /** Authenticate user and return JWT. */
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.status(200).json({ status: 'ok', ...result });
  } catch (e) {
    e.status = 401;
    next(e);
  }
}

module.exports = { signup, login };
