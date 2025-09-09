/* Checkout routes (Stripe) */
const express = require('express');
const { requireAuth } = require('../middleware');
const controller = require('../controllers/checkout');

const router = express.Router();

/**
 * @swagger
 * /checkout/session:
 *   post:
 *     tags: [Checkout]
 *     summary: Create Stripe Checkout Session for current cart
 *     description: Returns a Stripe session id and URL to redirect user for payment. If Stripe is not configured, returns a simulated session.
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       201: { description: Session created }
 *       400: { description: Bad request }
 */
router.post('/session', requireAuth, controller.createSession);

/**
 * @swagger
 * /checkout/success:
 *   get:
 *     tags: [Checkout]
 *     summary: Payment success handler (creates order)
 *     description: After Stripe redirects back with session_id, this endpoint finalizes the order and clears the cart.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order created }
 *       400: { description: Payment not completed }
 */
router.get('/success', requireAuth, controller.success);

module.exports = router;
