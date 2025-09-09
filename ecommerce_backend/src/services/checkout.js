/**
 * Checkout service with Stripe payment intent/session.
 * Using Stripe Checkout Sessions for simplicity.
 */
const Stripe = require('stripe');
const { totals, getCart } = require('./cart');
const { createOrderFromCart } = require('./orders');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000'; // used for redirect success/cancel

// Lazily initialize stripe if key provided
let stripe = null;
if (STRIPE_SECRET_KEY) {
  stripe = new Stripe(STRIPE_SECRET_KEY);
}

// PUBLIC_INTERFACE
async function createCheckoutSession(userId) {
  /** Create a Stripe Checkout Session for the user's current cart. */
  const cart = getCart(userId);
  if (!cart.items.length) {
    throw Object.assign(new Error('Cart is empty'), { status: 400 });
  }
  const cartTotals = totals(userId);

  if (!stripe) {
    // In environments without Stripe configured, simulate a session
    return {
      id: 'cs_test_simulated',
      url: `${SITE_URL}/checkout/simulated-session?amount=${cartTotals.amount}`,
      simulated: true
    };
  }

  const lineItems = cartTotals.items.map((i) => ({
    price_data: {
      currency: 'usd',
      product_data: { name: i.name },
      unit_amount: i.price
    },
    quantity: i.qty
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/checkout/cancel`,
  });

  return session;
}

// PUBLIC_INTERFACE
async function finalizeOrder(userId, sessionId) {
  /** After successful payment, verify session (if Stripe is configured) and create order. */
  let paymentInfo = { status: 'paid', stripeSessionId: sessionId || null };
  if (stripe && sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      throw Object.assign(new Error('Payment not completed'), { status: 400 });
    }
    paymentInfo = { status: session.payment_status, stripeSessionId: session.id };
  }
  const order = createOrderFromCart(userId, paymentInfo);
  return order;
}

module.exports = { createCheckoutSession, finalizeOrder };
