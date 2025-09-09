/**
 * Orders controller.
 */
const orderService = require('../services/orders');

// PUBLIC_INTERFACE
function get(req, res, next) {
  /** Get a specific order owned by the user. */
  try {
    const order = orderService.getById(req.user.sub, req.params.id);
    res.json({ status: 'ok', order });
  } catch (e) {
    next(e);
  }
}

module.exports = { get };
