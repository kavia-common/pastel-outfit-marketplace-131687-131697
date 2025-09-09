/* Cart routes */
const express = require('express');
const { requireAuth, validateBody } = require('../middleware');
const controller = require('../controllers/cart');

const router = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get current user's cart
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Cart returned }
 *       401: { description: Unauthorized }
 */
router.get('/', requireAuth, controller.getCart);

/**
 * @swagger
 * /cart/items:
 *   post:
 *     tags: [Cart]
 *     summary: Add item to cart
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId: { type: string }
 *               qty: { type: integer, default: 1 }
 *     responses:
 *       201: { description: Item added }
 */
router.post('/items', requireAuth, validateBody(['productId']), controller.addItem);

/**
 * @swagger
 * /cart/items/{productId}:
 *   put:
 *     tags: [Cart]
 *     summary: Update quantity of an item
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [qty]
 *             properties:
 *               qty: { type: integer }
 *     responses:
 *       200: { description: Updated }
 */
router.put('/items/:productId', requireAuth, validateBody(['qty']), controller.updateItem);

/**
 * @swagger
 * /cart/items/{productId}:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove item from cart
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Removed }
 */
router.delete('/items/:productId', requireAuth, controller.removeItem);

/**
 * @swagger
 * /cart/clear:
 *   post:
 *     tags: [Cart]
 *     summary: Clear cart
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Cleared }
 */
router.post('/clear', requireAuth, controller.clear);

/**
 * @swagger
 * /cart/totals:
 *   get:
 *     tags: [Cart]
 *     summary: Get cart totals
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Totals returned }
 */
router.get('/totals', requireAuth, controller.totals);

module.exports = router;
