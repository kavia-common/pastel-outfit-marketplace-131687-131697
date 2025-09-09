'use strict';

const express = require('express');
const productsController = require('../controllers/products');
const authController = require('../controllers/auth');
const cartController = require('../controllers/cart');
const ordersController = require('../controllers/orders');
const { authOptional, requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product catalog
 *   - name: Auth
 *     description: Mock user authentication
 *   - name: Cart
 *     description: Shopping cart operations
 *   - name: Orders
 *     description: Checkout and order history
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', authOptional, productsController.list.bind(productsController));

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/products/:id', authOptional, productsController.getById.bind(productsController));

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user (mock)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       409:
 *         description: User already exists
 */
router.post('/auth/register', authOptional, authController.register.bind(authController));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login (mock)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/auth/login', authOptional, authController.login.bind(authController));

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The cart
 *       401:
 *         description: Unauthorized
 */
router.get('/cart', requireAuth, cartController.getCart.bind(cartController));

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 default: 1
 *               size:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item added
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.post('/cart/add', requireAuth, cartController.addToCart.bind(cartController));

/**
 * @swagger
 * /api/cart/remove:
 *   post:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId:
 *                 type: string
 *               size:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item removed or not found
 *       401:
 *         description: Unauthorized
 */
router.post('/cart/remove', requireAuth, cartController.removeFromCart.bind(cartController));

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Checkout current cart (mock payment)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Cart is empty
 *       401:
 *         description: Unauthorized
 */
router.post('/checkout', requireAuth, ordersController.checkout.bind(ordersController));

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get current user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *       401:
 *         description: Unauthorized
 */
router.get('/orders', requireAuth, ordersController.listOrders.bind(ordersController));

module.exports = router;
