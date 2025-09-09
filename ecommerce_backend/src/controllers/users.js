/**
 * User controller for profile and history.
 */
const userService = require('../services/users');

// PUBLIC_INTERFACE
function me(req, res, next) {
  /** Get authenticated user profile. */
  try {
    const profile = userService.getProfile(req.user.sub);
    res.json({ status: 'ok', user: profile });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
function history(req, res, next) {
  /** Get authenticated user's order history. */
  try {
    const list = userService.getOrderHistory(req.user.sub);
    res.json({ status: 'ok', orders: list });
  } catch (e) {
    next(e);
  }
}

module.exports = { me, history };
