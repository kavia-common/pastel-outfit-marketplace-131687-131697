/* Orders routes */
const express = require('express');
const { requireAuth } = require('../middleware');
const controller = require('../controllers/orders');

const router = express.Router();

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order by id (owned by current user)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order returned }
 *       403: { description: Forbidden }
 *       404: { description: Not found }
 */
router.get('/:id', requireAuth, controller.get);

module.exports = router;
