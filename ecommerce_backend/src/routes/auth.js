/* Auth routes */
const express = require('express');
const { validateBody } = require('../middleware');
const controller = require('../controllers/auth');

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: User signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, format: password, minLength: 6 }
 *     responses:
 *       201:
 *         description: Account created
 *       409:
 *         description: Email already registered
 *       400:
 *         description: Invalid request
 */
router.post('/signup', validateBody(['name', 'email', 'password']), controller.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200:
 *         description: Authenticated
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validateBody(['email', 'password']), controller.login);

module.exports = router;
