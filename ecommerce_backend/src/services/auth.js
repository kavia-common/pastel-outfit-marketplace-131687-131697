/**
 * AuthService handles signup, login, and token generation.
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../models/store');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// PUBLIC_INTERFACE
async function signup({ name, email, password }) {
  /** Create a new user and return token + profile. */
  const user = await createUser({ name, email, password });
  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { token, user };
}

// PUBLIC_INTERFACE
async function login({ email, password }) {
  /** Authenticate a user by email/password and return token + profile. */
  const user = findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid credentials');

  const profile = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { token, user: profile };
}

module.exports = { signup, login };
