/**
 * Checkout controller for Stripe session and completion.
 */
const checkoutService = require('../services/checkout');

// PUBLIC_INTERFACE
async function createSession(req, res, next) {
  /** Create Stripe Checkout Session for current cart. */
  try {
    const session = await checkoutService.createCheckoutSession(req.user.sub);
    res.status(201).json({ status: 'ok', session });
  } catch (e) {
    next(e);
  }
}

// PUBLIC_INTERFACE
async function success(req, res, next) {
  /** Handle post-payment success; creates order. */
  try {
    const { session_id: sessionId } = req.query;
    const order = await checkoutService.finalizeOrder(req.user.sub, sessionId);
    res.json({ status: 'ok', order });
  } catch (e) {
    next(e);
  }
}

module.exports = { createSession, success };
