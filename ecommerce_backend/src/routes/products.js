/* Product routes */
const express = require('express');
const { requireAuth } = require('../middleware');
const controller = require('../controllers/products');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: List products
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Search query
 *       - in: query
 *         name: tag
 *         schema: { type: string }
 *         description: Filter by tag
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: pageSize
 *         schema: { type: integer, minimum: 1, default: 20 }
 *     responses:
 *       200: { description: Product list }
 */
router.get('/', controller.list);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Product }
 *       404: { description: Not found }
 */
router.get('/:id', controller.get);

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Create product (demo admin - requires auth)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: integer, description: "Amount in cents" }
 *               currency: { type: string, default: "usd" }
 *               imageUrl: { type: string }
 *               tags: { type: array, items: { type: string } }
 *               stock: { type: integer, default: 0 }
 *     responses:
 *       201: { description: Created }
 */
router.post('/', requireAuth, controller.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update product (demo admin - requires auth)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 */
router.put('/:id', requireAuth, controller.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete product (demo admin - requires auth)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 */
router.delete('/:id', requireAuth, controller.remove);

module.exports = router;
