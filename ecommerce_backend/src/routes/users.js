/* User routes */
const express = require('express');
const { requireAuth } = require('../middleware');
const controller = require('../controllers/users');

const router = express.Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get current user profile
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Profile returned }
 *       401: { description: Unauthorized }
 */
router.get('/me', requireAuth, controller.me);

/**
 * @swagger
 * /users/orders:
 *   get:
 *     tags: [Users]
 *     summary: Get order history for current user
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Order history }
 *       401: { description: Unauthorized }
 */
router.get('/orders', requireAuth, controller.history);

module.exports = router;
